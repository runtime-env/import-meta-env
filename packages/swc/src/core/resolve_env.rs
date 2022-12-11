use super::{
    resolve_env_example_keys::resolve_env_example_keys,
    resolve_env_from_file_name::resolve_env_from_file_name,
};

pub fn resolve_env(
    env_file_name: Option<String>,
    env_example_file_name: String,
) -> Vec<(String, String)> {
    let normalized_env_file_name = match env_file_name {
        Some(env_file_name) => env_file_name,
        None => String::from(".env"),
    };
    let env: Vec<(String, String)> = resolve_env_from_file_name(&normalized_env_file_name);
    let env_keys = env
        .iter()
        .map(|(k, _)| k.to_owned())
        .collect::<Vec<String>>();
    let env_example = resolve_env_from_file_name(&env_example_file_name);
    let env_example_keys = resolve_env_example_keys(env_example_file_name.to_owned());

    let mut filtered_env: Vec<(String, String)> = env
        .into_iter()
        .filter(|(k, _)| env_example_keys.contains(&k))
        .collect();

    let missing_keys: Vec<String> = env_example
        .iter()
        .filter(|(k, _)| env_keys.contains(&k) == false)
        .map(|(k, _)| k.to_owned())
        .collect();
    if missing_keys.len() != 0 {
        println!(
            r#"
[import-meta-env]: Some environment variables are not defined.

The following variables were defined in {0} file but are not defined in the environment:

```
{2}
```

Here's what you can do:
- Set them to environment variables on your system.
- Add them to {1} file.
- Remove them from {0} file.
        "#,
            env_example_file_name,
            normalized_env_file_name,
            missing_keys
                .iter()
                .map(|key| key.to_owned()
                    + "="
                    + env_example
                        .iter()
                        .find(|(k, _)| k == key)
                        .unwrap()
                        .1
                        .as_str())
                .collect::<Vec<String>>()
                .join("\n")
        );
        panic!("Some environment variables are not defined.");
    }

    filtered_env.sort();

    filtered_env
}

#[cfg(test)]
mod tests {
    use super::resolve_env;
    use std::env::set_current_dir;
    use std::fs::{create_dir, File};
    use std::io::Write;
    use tempfile::tempdir;

    #[test]
    fn spec_specify_env() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let env_file_name = ".foo".to_owned();
        let mut env_file: File = File::create(dir.path().join("cwd").join(&env_file_name)).unwrap();
        write!(
            env_file,
            "
            COMPILE_TIME=some
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
            vec![("COMPILE_TIME".to_owned(), "some".to_owned()),]
        )
    }

    #[test]
    fn spec_fallback_to_dot_env() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let env_file_name = ".env".to_owned();
        let mut env_file: File = File::create(dir.path().join("cwd").join(&env_file_name)).unwrap();
        write!(
            env_file,
            "
            COMPILE_TIME=none
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
        let result = resolve_env(None, env_example_file_name);

        // assert
        assert_eq!(
            result,
            vec![("COMPILE_TIME".to_owned(), "none".to_owned()),]
        )
    }

    #[test]
    #[should_panic]
    fn spec_env_is_required() {
        // arrange
        let dir = tempdir().unwrap();
        create_dir(dir.path().join("cwd")).unwrap();
        set_current_dir(dir.path()).unwrap();
        let env_example_file_name = ".env.example".to_owned();

        // act
        resolve_env(None, env_example_file_name);
    }
}
