use serde;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct Config {
    /**
     * The .env file path to load, related to current working directory.
     *
     * Defaults to ".env"
     */
    pub env_path: Option<String>,

    /**
     * The public .env example file path to load, related to current working directory.
     */
    pub env_example_path: String,

    /**
     * Compile-time: statically replace `import.meta.env.KEY` with `"value"`
     * Runtime: statically replace `import.meta.env` with a global accessor
     *
     * Default:
     *
     * if `TransformPluginMetadataContextKind::Env` equals to `"production"`
     * then `Some(TransformMode::Runtime)`
     * otherwise `Some(TransformMode::CompileTime)`
     */
    #[serde(rename = "transformMode")]
    pub transform_mode: Option<TransformMode>,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub enum TransformMode {
    #[serde(rename = "compile-time")]
    CompileTime,

    #[serde(rename = "runtime")]
    Runtime,
}
