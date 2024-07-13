use serde;
use swc_core::{
    atoms::Atom,
    common::DUMMY_SP,
    ecma::{
        ast::{
            BinExpr, BinaryOp, CallExpr, Callee, Expr, ExprOrSpread, Ident, IdentName, Lit,
            MemberExpr, MemberProp, MetaPropKind, Null, Str,
        },
        atoms::js_word,
        visit::{VisitMut, VisitMutWith},
    },
};

use super::mode::Mode;

pub struct TransformImportMetaEnv {
    mode: Mode,
    example_keys: Vec<String>,
}

impl TransformImportMetaEnv {
    pub fn new(mode: Mode) -> TransformImportMetaEnv {
        let example_keys: Vec<String> = match &mode {
            Mode::CompileTime {
                env: _,
                env_example_keys,
            } => env_example_keys.to_vec(),
            Mode::Runtime { env_example_keys } => env_example_keys.to_vec(),
        };

        TransformImportMetaEnv { mode, example_keys }
    }
}

impl VisitMut for TransformImportMetaEnv {
    fn visit_mut_expr(&mut self, n: &mut Expr) {
        n.visit_mut_children_with(self);

        if n.is_member() == false {
            return;
        }

        let old_member_expr = n.as_member().unwrap();
        if as_is_visiting_import_meta_env_prop(old_member_expr, &self.example_keys).is_some() {
            match &self.mode {
                Mode::CompileTime {
                    env,
                    env_example_keys: _,
                } => {
                    *n = Expr::Lit(Lit::Str(Str {
                        value: Atom::from(
                            env.iter()
                                .find(|(key, _)| {
                                    *key == old_member_expr.prop.as_ident().unwrap().sym.to_string()
                                })
                                .unwrap()
                                .1
                                .clone(),
                        ),
                        raw: None,
                        span: DUMMY_SP,
                    }))
                }
                Mode::Runtime {
                    env_example_keys: _,
                } => {
                    *n = Expr::Member(MemberExpr {
                        obj: Box::new(create_accessor_expr()),
                        span: old_member_expr.span.clone(),
                        prop: old_member_expr.prop.clone(),
                    });
                }
            };
        }
    }
}

fn as_is_visiting_import_meta_env_prop(n: &MemberExpr, example_keys: &Vec<String>) -> Option<()> {
    // {}.{}.{}.{}
    let prop = n.prop.as_ident()?;
    let obj = n.obj.as_member()?;
    let obj_prop = obj.prop.as_ident()?;
    let obj_obj = obj.obj.as_meta_prop()?;

    // import.meta.{}.{}
    if obj_obj.kind != MetaPropKind::ImportMeta {
        return None;
    }

    // import.meta.env.{}
    if obj_prop.sym.to_string() != "env" {
        return None;
    }

    // import.meta.env.PUBLIC_PROPERTY
    if example_keys.iter().any(|key| *key == prop.sym.to_string()) == false {
        return None;
    }

    Some(())
}

fn create_accessor_expr() -> Expr {
    Expr::Call(CallExpr {
        callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
            obj: Box::new(Expr::Ident(Ident {
                sym: js_word!("Object"),
                optional: false,
                span: DUMMY_SP,
            })),
            prop: MemberProp::Ident(IdentName {
                sym: Atom::from(r#"create"#),
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
                    prop: MemberProp::Ident(IdentName {
                        sym: Atom::from(r#"import_meta_env"#),
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
    mode: Option<Str>,
}

#[cfg(test)]
mod tests {
    use super::{Mode, TransformImportMetaEnv};
    use swc_core::ecma::{transforms::testing::test, visit::as_folder};

    // compile-time
    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::CompileTime {
            env: vec![],
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_compile_time_mode_ignore_new_target_env_hello,
        // Input codes
        r#"function _() { new.target.env.EXISTS; }"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::CompileTime {
            env: vec![],
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_compile_time_mode_ignore_import_meta_url_hello,
        // Input codes
        r#"import.meta.url.EXISTS"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::CompileTime {
            env: vec![],
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_compile_time_mode_ignore_import_meta_env,
        // Input codes
        r#"import.meta.env"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::CompileTime {
            env: vec![("EXISTS".to_string(), "value".to_string()),],
            env_example_keys: vec![String::from("EXISTS")],
        })),
        spec_compile_time_mode_import_meta_env_property,
        // Input codes
        r#"
        const exists = import.meta.env.EXISTS;
        const not_exists = import.meta.env.NOT_EXISTS;
        "#
    );

    // runtime
    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_runtime_mode_ignore_new_target_env_hello,
        // Input codes
        r#"function _() { new.target.env.EXISTS; }"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_runtime_mode_ignore_import_meta_url_hello,
        // Input codes
        r#"import.meta.url.EXISTS"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("EXISTS")]
        })),
        spec_runtime_mode_ignore_import_meta_env,
        // Input codes
        r#"import.meta.env"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("EXISTS")],
        })),
        spec_runtime_mode_import_meta_env_property,
        // Input codes
        r#"
        const exists = import.meta.env.EXISTS;
        const not_exists = import.meta.env.NOT_EXISTS;
        "#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("PORT")],
        })),
        spec_call_expr,
        // Input codes
        r#"parseInt(import.meta.env.PORT, 10)"#
    );

    test!(
        Default::default(),
        |_| as_folder(TransformImportMetaEnv::new(Mode::Runtime {
            env_example_keys: vec![String::from("PROTOCOL"), String::from("HOST"),],
        })),
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
        "#
    );
}
