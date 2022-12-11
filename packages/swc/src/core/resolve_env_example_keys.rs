use super::resolve_env_from_file_name::resolve_env_from_file_name;

pub fn resolve_env_example_keys(env_example_file_name: String) -> Vec<String> {
    resolve_env_from_file_name(&env_example_file_name)
        .iter()
        .map(|(k, _)| k.to_owned())
        .collect::<Vec<String>>()
}

#[cfg(test)]
mod tests {
    use super::resolve_env_example_keys;
    use std::env::set_current_dir;
    use std::fs::{create_dir, File};
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn spec_it_should_works() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let env_example_file_name = ".env.example".to_owned();
        let mut env_example_file: File =
            File::create(dir.path().join("cwd").join(&env_example_file_name)).unwrap();
        write!(
            env_example_file,
            "
            FOO=file
            BAR=file
            "
        )
        .unwrap();

        // act
        let result = resolve_env_example_keys(env_example_file_name.to_owned());

        // assert
        assert_eq!(result, vec!["FOO".to_owned(), "BAR".to_owned()])
    }
}
