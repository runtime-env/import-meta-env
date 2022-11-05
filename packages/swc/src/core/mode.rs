pub enum Mode {
    CompileTime {
        env: Vec<(String, String)>,
        env_example: Vec<(String, String)>,
    },

    Runtime {
        env_example: Vec<(String, String)>,
    },
}
