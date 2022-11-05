use std::{fs, path};

pub fn resolve_env(
    env_file_name: Option<String>,
    env_example_file_name: String,
) -> Vec<(String, String)> {
    let env: Vec<(String, String)> = if let Some(env_file_name) = env_file_name {
        resolve_env_from_file_name(&env_file_name)
    } else {
        resolve_env_from_file_name(".env")
    };
    let env_example = resolve_env_from_file_name(&env_example_file_name);
    let env_example_keys = env_example
        .iter()
        .map(|(k, _)| k.to_owned())
        .collect::<Vec<String>>();

    let mut filtered_env: Vec<(String, String)> = env
        .into_iter()
        .filter(|(k, _)| env_example_keys.contains(&k))
        .collect();

    filtered_env.sort();

    filtered_env
}

fn resolve_env_from_file_name(file_name: &str) -> Vec<(String, String)> {
    let mut env = vec![];

    let file_path = path::Path::new(".").join("cwd").join(file_name);
    let file_content = fs::read_to_string(&file_path).expect(&format!(
        "failed to load file content from {:?}",
        &file_path
    ));
    ini::Ini::load_from_str(file_content.as_str())
        .unwrap()
        .into_iter()
        .map(|(_, prop)| prop.iter())
        .flatten()
        .for_each(|(k, v)| {
            env.push((k.to_owned(), v.to_owned()));
        });

    env
}

#[cfg(test)]
mod tests {
    use super::resolve_env;
    use std::env::set_current_dir;
    use std::fs::{create_dir, File};
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn spec_resolve_env() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let env_file_name = ".env".to_owned();
        let mut env_file: File = File::create(dir.path().join("cwd").join(&env_file_name)).unwrap();
        write!(
            env_file,
            "
            COMPILE_TIME=compile-time
            SECRET=***
            "
        )
        .unwrap();

        let env_example_file_name = ".env.example".to_owned();
        let mut env_example_file: File =
            File::create(dir.path().join("cwd").join(&env_example_file_name)).unwrap();
        write!(
            env_example_file,
            "
            COMPILE_TIME=
            "
        )
        .unwrap();

        // act
        let result = resolve_env(Some(env_file_name), env_example_file_name);

        // assert
        assert_eq!(
            result,
            vec![("COMPILE_TIME".to_owned(), "compile-time".to_owned()),]
        )
    }
}
