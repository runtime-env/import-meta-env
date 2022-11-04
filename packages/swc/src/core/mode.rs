pub enum Mode {
    Inline {
        env: Vec<(String, String)>,
        env_example: Vec<(String, String)>,
    },

    Placeholder {
        env_example: Vec<(String, String)>,
    },
}
