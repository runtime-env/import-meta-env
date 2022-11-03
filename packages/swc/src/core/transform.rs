use std::vec;

use serde;
use string_cache::Atom;
use swc_core::{
    common::DUMMY_SP,
    ecma::{
        ast::{
            Expr, Ident, ImportDecl, ImportDefaultSpecifier, ImportSpecifier, KeyValueProp, Lit,
            MemberExpr, MetaPropKind, ModuleDecl, ModuleItem, ObjectLit, Program, Prop, PropName,
            PropOrSpread, Str,
        },
        visit::{VisitMut, VisitMutWith},
    },
};

use super::mode::Mode;

pub struct TransformImportMetaEnv {
    mode: Mode,
    id: String,
}

impl TransformImportMetaEnv {
    pub fn new(mode: Mode, timestamp: u128) -> TransformImportMetaEnv {
        TransformImportMetaEnv {
            mode,
            id: format!("import_meta_env_{}", timestamp),
        }
    }
}

impl VisitMut for TransformImportMetaEnv {
    fn visit_mut_program(&mut self, n: &mut Program) {
        n.visit_mut_children_with(self);

        match &self.mode {
            Mode::Inline { env: _ } => return,
            Mode::Placeholder => (),
        }

        if n.is_module() == false {
            return;
        }

        let module = n.as_mut_module().unwrap();
        if module
            .body
            .iter()
            .any(|element| match element.as_module_decl() {
                Some(module_decl) => match module_decl.as_import() {
                    Some(import_decl) => {
                        import_decl
                            .specifiers
                            .iter()
                            .any(|import_specifier| match import_specifier.as_default() {
                                Some(import_default_specifier) => {
                                    import_default_specifier.local.sym
                                        == Atom::from(self.id.clone())
                                }
                                None => false,
                            })
                    }
                    None => false,
                },
                None => false,
            })
        {
            return;
        }

        let body = &mut module.body;

        body.insert(
            0,
            ModuleItem::ModuleDecl(ModuleDecl::Import(ImportDecl {
                span: DUMMY_SP,
                specifiers: vec![ImportSpecifier::Default(ImportDefaultSpecifier {
                    span: DUMMY_SP,
                    local: Ident {
                        span: DUMMY_SP,
                        sym: Atom::from(self.id.clone()),
                        optional: false,
                    },
                })],
                src: Box::new(Str {
                    span: DUMMY_SP,
                    value: Atom::from(format!("{}.js", &self.id)),
                    raw: None,
                }),
                type_only: false,
                asserts: None,
            })),
        )
    }

    fn visit_mut_expr(&mut self, n: &mut Expr) {
        n.visit_mut_children_with(self);

        if n.is_member() == false {
            return;
        }

        let new_expr = match &self.mode {
            Mode::Inline { env } => create_inline_obj(&env),
            Mode::Placeholder => create_placeholder_obj(self.id.clone()),
        };
        let old_member_expr = n.as_member().unwrap();
        if is_visiting_import_meta_env(old_member_expr) {
            // import.meta.env
            *n = new_expr;
        } else if is_visiting_import_meta_env_prop(old_member_expr) {
            // import.meta.env.PROP
            *n = Expr::Member(MemberExpr {
                obj: Box::new(new_expr),
                span: old_member_expr.span.clone(),
                prop: old_member_expr.prop.clone(),
            });
        }
    }
}

fn is_visiting_import_meta_env(n: &MemberExpr) -> bool {
    n.obj.is_meta_prop()
        && n.obj.as_meta_prop().unwrap().kind == MetaPropKind::ImportMeta
        && n.prop.is_ident()
        && n.prop.as_ident().unwrap().sym.to_string() == "env"
}

fn is_visiting_import_meta_env_prop(n: &MemberExpr) -> bool {
    n.obj.is_member() && is_visiting_import_meta_env(n.obj.as_member().unwrap())
}

fn create_inline_obj(env: &Vec<(String, String)>) -> Expr {
    Expr::Object(ObjectLit {
        props: env
            .into_iter()
            .map(|(key, value)| {
                PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                    key: PropName::Str(Str {
                        value: Atom::from(key.as_str()),
                        raw: None,
                        span: DUMMY_SP,
                    }),
                    value: Box::new(Expr::Lit(Lit::Str(Str {
                        value: Atom::from(value.as_str()),
                        raw: None,
                        span: DUMMY_SP,
                    }))),
                })))
            })
            .collect(),
        span: DUMMY_SP,
    })
}

fn create_placeholder_obj(id: String) -> Expr {
    Expr::Ident(Ident {
        span: DUMMY_SP,
        sym: Atom::from(id),
        optional: false,
    })
}

#[derive(serde::Serialize, serde::Deserialize)]
struct Config {
    env_path: Option<Str>,
    example_path: Str,
    should_inline_env: Option<bool>,
}

#[cfg(test)]
mod tests {
    use super::{Mode, TransformImportMetaEnv};
    use swc_core::ecma::{transforms::testing::test, visit::as_folder};

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Inline { env: vec![] }, 0,)),
        spec_access_other_import_meta_should_be_ignored_1,
        // Input codes
        r#"import.meta"#,
        // Output codes after transformed with plugin
        r#"import.meta"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Inline { env: vec![] }, 0,)),
        spec_access_other_import_meta_should_be_ignored_2,
        // Input codes
        r#"import.meta.url"#,
        // Output codes after transformed with plugin
        r#"import.meta.url"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Inline { env: vec![] }, 0,)),
        spec_access_other_meta_property_should_be_ignored,
        // Input codes
        r#"function _() { new.target.env; }"#,
        // Output codes after transformed with plugin
        r#"function _() { new.target.env; }"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(
            Mode::Inline {
                env: vec![
                    ("KEY1".to_string(), "value1".to_string()),
                    ("KEY2".to_string(), "value2".to_string())
                ]
            },
            0,
        )),
        spec_inline_mode_access_all_env_should_be_inlined,
        // Input codes
        r#"import.meta.env"#,
        // Output codes after transformed with plugin
        r#"({"KEY1":"value1","KEY2":"value2"})"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(
            Mode::Inline {
                env: vec![
                    ("KEY1".to_string(), "value1".to_string()),
                    ("KEY2".to_string(), "value2".to_string())
                ]
            },
            0,
        )),
        spec_inline_mode_access_env_prop_should_be_inlined,
        // Input codes
        r#"import.meta.env.KEY1"#,
        // Output codes after transformed with plugin
        r#"({"KEY1":"value1","KEY2":"value2"}).KEY1"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Placeholder, 0,)),
        spec_placeholder_mode_access_all_env_should_not_be_inlined,
        // Input codes
        r#"import.meta.env"#,
        // Output codes after transformed with plugin
        r#"
        import_meta_env_0
        "#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Placeholder, 0,)),
        spec_placeholder_mode_access_env_prop_should_not_be_inlined,
        // Input codes
        r#"import.meta.env.HELLO"#,
        // Output codes after transformed with plugin
        r#"
        import_meta_env_0.HELLO
        "#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Placeholder, 42)),
        spec_call_expr,
        // Input codes
        r#"parseInt(import.meta.env.PORT, 10)"#,
        // Output codes after transformed with plugin
        r#"
        parseInt(import_meta_env_42.PORT, 10)
        "#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Placeholder, 0,)),
        spec_return_stmt,
        // Input codes
        r#"
        function API_URL () {
            return [
                import.meta.env.PROTOCOL,
                "//",
                import.meta.env.HOST,
            ].join("");
        }
        "#,
        // Output codes after transformed with plugin
        r#"
        function API_URL () {
            return [
                import_meta_env_0.PROTOCOL,
                "//",
                import_meta_env_0.HOST,
            ].join("");
        }
        "#
    );
}
