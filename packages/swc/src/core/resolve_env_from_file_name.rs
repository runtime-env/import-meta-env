use std::{fs, path};

pub fn resolve_env_from_file_name(file_name: &str) -> Vec<(String, String)> {
    let mut env = vec![];

    let file_path = path::Path::new(".").join("cwd").join(file_name);
    let file_content = fs::read_to_string(&file_path).expect(&format!(
        "[import-meta-env] failed to load file content from \"{:?}\"",
        &file_name
    ));
    ini::Ini::load_from_str(file_content.as_str())
        .unwrap()
        .into_iter()
        .flat_map(|(_, prop)| prop.into_iter())
        .for_each(|(k, v)| {
            env.push((k.to_owned(), v.to_owned()));
        });

    env
}

#[cfg(test)]
mod tests {
    use super::resolve_env_from_file_name;
    use std::env::set_current_dir;
    use std::fs::{create_dir, File};
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn spec_resolve_env_from_file_name() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let file_name = "file".to_owned();
        let mut file: File = File::create(dir.path().join("cwd").join(&file_name)).unwrap();
        write!(
            file,
            "
            FOO=file
            "
        )
        .unwrap();

        // act
        let result = resolve_env_from_file_name(file_name.as_str());

        // assert
        assert_eq!(result, vec![("FOO".to_owned(), "file".to_owned()),])
    }

    #[test]
    #[should_panic]
    fn spec_it_should_panic_if_env_example_is_not_found() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let file_name = ".env.example".to_owned();

        // act
        resolve_env_from_file_name(file_name.as_str());
    }
}
