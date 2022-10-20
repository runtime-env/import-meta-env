pub enum Mode {
    Inline { env: Vec<(String, String)> },

    Placeholder,
}
