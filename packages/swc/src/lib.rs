mod config;
mod core;

use crate::{
    config::Config,
    core::{mode::Mode, resolve_env::resolve_env, transform::TransformImportMetaEnv},
};
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

    let should_inline_env: bool = {
        if config.should_inline_env.is_some() {
            config.should_inline_env.unwrap()
        } else {
            metadata
                .get_context(&TransformPluginMetadataContextKind::Env)
                .unwrap()
                != "production"
        }
    };
    if should_inline_env {
        program.fold_with(&mut as_folder(TransformImportMetaEnv {
            mode: Mode::Inline {
                env: resolve_env(config.env_path, config.env_example_path),
            },
        }))
    } else {
        program.fold_with(&mut as_folder(TransformImportMetaEnv {
            mode: Mode::Placeholder,
        }))
    }
}
