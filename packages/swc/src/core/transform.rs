use serde;
use string_cache::Atom;
use swc_core::{
    common::DUMMY_SP,
    ecma::{
        ast::{
            BinExpr, BinaryOp, CallExpr, Callee, ComputedPropName, Expr, ExprOrSpread, Ident,
            KeyValueProp, Lit, MemberExpr, MemberProp, MetaPropKind, Null, ObjectLit, Prop,
            PropName, PropOrSpread, Str,
        },
        atoms::js_word,
        visit::{VisitMut, VisitMutWith},
    },
};

use super::mode::Mode;

pub struct TransformImportMetaEnv {
    pub mode: Mode,
}

impl VisitMut for TransformImportMetaEnv {
    fn visit_mut_expr(&mut self, n: &mut Expr) {
        n.visit_mut_children_with(self);

        if n.is_member() == false {
            return;
        }

        let new_expr = match &self.mode {
            Mode::Inline { env } => create_inline_obj(&env),
            Mode::Placeholder => create_placeholder_obj(),
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

fn create_placeholder_obj() -> Expr {
    Expr::Call(CallExpr {
        callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
            obj: Box::new(Expr::Ident(Ident {
                sym: js_word!("Object"),
                optional: false,
                span: DUMMY_SP,
            })),
            prop: MemberProp::Ident(Ident {
                sym: Atom::from(r#"create"#),
                optional: false,
                span: DUMMY_SP,
            }),
            span: DUMMY_SP,
        }))),
        args: vec![ExprOrSpread {
            spread: None,
            expr: Box::new(Expr::Bin(BinExpr {
                op: BinaryOp::LogicalOr,
                left: Box::new(Expr::Member(MemberExpr {
                    obj: Box::new(Expr::Ident(Ident {
                        sym: Atom::from(r#"globalThis"#),
                        optional: false,
                        span: DUMMY_SP,
                    })),
                    prop: MemberProp::Computed(ComputedPropName {
                        expr: Box::new(Expr::Call(CallExpr {
                            callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
                                obj: Box::new(Expr::Lit(Lit::Str(Str {
                                    value: Atom::from(r#"import_meta_env"#),
                                    raw: None,
                                    span: DUMMY_SP,
                                }))),
                                prop: MemberProp::Ident(Ident {
                                    sym: Atom::from(r#"slice"#),
                                    optional: false,
                                    span: DUMMY_SP,
                                }),
                                span: DUMMY_SP,
                            }))),
                            args: vec![],
                            type_args: None,
                            span: DUMMY_SP,
                        })),
                        span: DUMMY_SP,
                    }),
                    span: DUMMY_SP,
                })),
                right: Box::new(Expr::Lit(Lit::Null(Null { span: DUMMY_SP }))),
                span: DUMMY_SP,
            })),
        }],
        type_args: None,
        span: DUMMY_SP,
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
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Inline { env: vec![] }
        }),
        spec_access_other_import_meta_should_be_ignored_1,
        // Input codes
        r#"import.meta"#,
        // Output codes after transformed with plugin
        r#"import.meta"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Inline { env: vec![] }
        }),
        spec_access_other_import_meta_should_be_ignored_2,
        // Input codes
        r#"import.meta.url"#,
        // Output codes after transformed with plugin
        r#"import.meta.url"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Inline { env: vec![] }
        }),
        spec_access_other_meta_property_should_be_ignored,
        // Input codes
        r#"function _() { new.target.env; }"#,
        // Output codes after transformed with plugin
        r#"function _() { new.target.env; }"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Inline {
                env: vec![
                    ("KEY1".to_string(), "value1".to_string()),
                    ("KEY2".to_string(), "value2".to_string())
                ]
            }
        }),
        spec_inline_mode_access_all_env_should_be_inlined,
        // Input codes
        r#"import.meta.env"#,
        // Output codes after transformed with plugin
        r#"({"KEY1":"value1","KEY2":"value2"})"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Inline {
                env: vec![
                    ("KEY1".to_string(), "value1".to_string()),
                    ("KEY2".to_string(), "value2".to_string())
                ]
            }
        }),
        spec_inline_mode_access_env_prop_should_be_inlined,
        // Input codes
        r#"import.meta.env.KEY1"#,
        // Output codes after transformed with plugin
        r#"({"KEY1":"value1","KEY2":"value2"}).KEY1"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Placeholder
        }),
        spec_placeholder_mode_access_all_env_should_not_be_inlined,
        // Input codes
        r#"import.meta.env"#,
        // Output codes after transformed with plugin
        r#"Object.create(globalThis["import_meta_env".slice()] || null)"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Placeholder
        }),
        spec_placeholder_mode_access_env_prop_should_not_be_inlined,
        // Input codes
        r#"import.meta.env"#,
        // Output codes after transformed with plugin
        r#"Object.create(globalThis["import_meta_env".slice()] || null)"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Placeholder
        }),
        spec_call_expr,
        // Input codes
        r#"parseInt(import.meta.env.PORT, 10)"#,
        // Output codes after transformed with plugin
        r#"parseInt(Object.create(globalThis["import_meta_env".slice()] || null).PORT, 10)"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv {
            mode: Mode::Placeholder
        }),
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
                Object.create(globalThis["import_meta_env".slice()] || null).PROTOCOL,
                "//",
                Object.create(globalThis["import_meta_env".slice()] || null).HOST,
            ].join("");
        }
        "#
    );
}
