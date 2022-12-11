use super::resolve_env_from_file_name::resolve_env_from_file_name;

pub fn resolve_env_example(env_example_file_name: String) -> Vec<(String, String)> {
    resolve_env_from_file_name(&env_example_file_name)
}
