export const verifySnippet = (expected: string) =>
  `
function verify (actual) {
  const expectedKeys = ${JSON.stringify(
    Object.keys(JSON.parse(expected)).reduce(
      (acc, key) => Object.assign(acc, { [key]: true }),
      {}
    )
  )};
  const importMetaEnv = 'import.meta' + '.env';

  const missingKeys = [];
  Object.keys(expectedKeys).forEach(key => {
    if (Object.hasOwnProperty.call(actual, key) === false) {
      missingKeys.push(JSON.stringify(key));
    }
  })
  if (missingKeys.length) {
    throw new Error(\`[vite-plugin-dotenv]: The following variables were defined in \${importMetaEnv} but are not present in the environment: \` + missingKeys.join(', '));
  }

  const notExistsKeys = [];
  Object.keys(actual).forEach(key => {
    if (Object.hasOwnProperty.call(expectedKeys, key) === false) {
      notExistsKeys.push(JSON.stringify(key));
    }
  })
  if (notExistsKeys.length) {
    throw new Error(\`[vite-plugin-dotenv]: The following variables were NOT defined in \${importMetaEnv} but are present in the environment: \` + notExistsKeys.join(', '));
  }
}
`.trim();
