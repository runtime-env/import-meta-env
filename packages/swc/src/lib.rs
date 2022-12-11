mod config;
mod core;

use crate::{
    config::Config,
    core::{
        mode::Mode, resolve_env::resolve_env, resolve_env_example_keys::resolve_env_example_keys,
        transform::TransformImportMetaEnv,
    },
};
use config::TransformMode;
use swc_core::{
    ecma::{
        ast::Program,
        visit::{as_folder, FoldWith},
    },
    plugin::{
        metadata::TransformPluginMetadataContextKind, plugin_transform,
        proxies::TransformPluginProgramMetadata,
    },
};

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let config: Config = serde_json::from_str(
        &metadata
            .get_transform_plugin_config()
            .expect("failed to get plugin config for @import-meta-env/swc"),
    )
    .expect("invalid config");

    let mode = {
        if config.transform_mode.is_some() {
            config.transform_mode.unwrap()
        } else {
            if metadata
                .get_context(&TransformPluginMetadataContextKind::Env)
                .unwrap()
                == "production"
            {
                TransformMode::Runtime
            } else {
                TransformMode::CompileTime
            }
        }
    };
    match mode {
        TransformMode::CompileTime => program.fold_with(&mut as_folder(
            TransformImportMetaEnv::new(Mode::CompileTime {
                env: resolve_env(config.env, config.example.clone()),
                env_example_keys: resolve_env_example_keys(config.example.clone()),
            }),
        )),
        TransformMode::Runtime => {
            program.fold_with(&mut as_folder(TransformImportMetaEnv::new(Mode::Runtime {
                env_example_keys: resolve_env_example_keys(config.example.clone()),
            })))
        }
    }
}
