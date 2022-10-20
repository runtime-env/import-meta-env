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
     * Explicitly set whether to inline current environment variables into the code,
     * instead of inject environment variables via `import-meta-env` later.
     *
     * Defaults to `(process.env.SWC_ENV || process.env.NODE_ENV || "production") != "production"`
     */
    pub should_inline_env: Option<bool>,
}
