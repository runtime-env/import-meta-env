pub enum Mode {
    CompileTime {
        env: Vec<(String, String)>,
        env_example_keys: Vec<String>,
    },

    Runtime {
        env_example_keys: Vec<String>,
    },
}
