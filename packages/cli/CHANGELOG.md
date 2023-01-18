# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/iendeavor/import-meta-env/compare/cli0.4.1...cli0.5.0) (2023-01-18)


### Features

* **cli:** rename option `--output` to `--path` ([08cf5bf](https://github.com/iendeavor/import-meta-env/commit/08cf5bfad9e22985d73f299746777d5962c2ea0f))


### Bug Fixes

* **deps:** update dependency commander to v10 ([d7b6d3d](https://github.com/iendeavor/import-meta-env/commit/d7b6d3da733db25acfab1b00fa0cd7b226f141a8))
* **deps:** update dependency commander to v9.5.0 ([199b47f](https://github.com/iendeavor/import-meta-env/commit/199b47f23898896a568d225f901f52f97ff8f98a))
* **deps:** update dependency glob to v8.1.0 ([cae7ab9](https://github.com/iendeavor/import-meta-env/commit/cae7ab98197287bdde230c8dc21fefab43d6e509))
* **deps:** update dependency serialize-javascript to v6.0.1 ([080f7eb](https://github.com/iendeavor/import-meta-env/commit/080f7eb997ceeda50d5c067303e853aed657b165))

### [0.4.1](https://github.com/iendeavor/import-meta-env/compare/cli0.4.0...cli0.4.1) (2022-12-11)

## [0.4.0](https://github.com/iendeavor/import-meta-env/compare/cli0.3.0...cli0.4.0) (2022-11-27)


### ⚠ BREAKING CHANGES

* you need to replace script tag with another placeholder

### Features

* support for programmatically injecting scripts ([8da281d](https://github.com/iendeavor/import-meta-env/commit/8da281dd6eae0f43d4db92e1bbfe28f70f1065bf))

## [0.3.0](https://github.com/iendeavor/import-meta-env/compare/cli0.2.2...cli0.3.0) (2022-11-06)


### ⚠ BREAKING CHANGES

* you have to manually add a script tag to index.html
* drop support for nuxt and qwik for now
* no longer support non-static property accessing

### Features

* drop support for entire object and computed-property accessing ([4e4fd9a](https://github.com/iendeavor/import-meta-env/commit/4e4fd9aa54710eafbb79e79aa340ea53e0e864a7))


### Bug Fixes

* generate correct source-maps ([4c1d81d](https://github.com/iendeavor/import-meta-env/commit/4c1d81dc929f104546671fb91e55c26f2fd4061a))

### [0.2.2](https://github.com/iendeavor/import-meta-env/compare/cli0.2.1...cli0.2.2) (2022-10-22)


### Features

* swc plugin ([da27eb7](https://github.com/iendeavor/import-meta-env/commit/da27eb7f305a4cb2e415588b78387d53a29f193d))


### Bug Fixes

* wrong peer deps range ([f54e5ec](https://github.com/iendeavor/import-meta-env/commit/f54e5ec3b7610203fbd24f734a3ff5af61d903dc))

### [0.2.1](https://github.com/iendeavor/import-meta-env/compare/cli0.2.0...cli0.2.1) (2022-10-16)


### Bug Fixes

* eval may being blocked by CSP ([8778ceb](https://github.com/iendeavor/import-meta-env/commit/8778ceb356c9696177a295c4347d3c5fc6f7f723))

## [0.2.0](https://github.com/iendeavor/import-meta-env/compare/cli0.1.8...cli0.2.0) (2022-10-13)


### Bug Fixes

* **deps:** update dependency glob to v8 ([3023dd4](https://github.com/iendeavor/import-meta-env/commit/3023dd430922ceded97874b09dd637ec5574ce85))
* literal string (placeholder) may be removed by minifier ([10c567c](https://github.com/iendeavor/import-meta-env/commit/10c567c288dfee2da866910cf895fb1c00fa338d))

### [0.1.8](https://github.com/iendeavor/import-meta-env/compare/cli0.1.7...cli0.1.8) (2022-10-10)


### ⚠ BREAKING CHANGES

* no longer support node 12
* no longer support node 12

### Features

* deprecate node 12 ([33003ca](https://github.com/iendeavor/import-meta-env/commit/33003ca1045dcaa28dde6d12f577b07aa6e0951a))
* no longer support node 12 ([9086406](https://github.com/iendeavor/import-meta-env/commit/908640683e0dff593816c75903da51f971943863))

### [0.1.7](https://github.com/iendeavor/import-meta-env/compare/cli0.1.6...cli0.1.7) (2022-03-25)


### Bug Fixes

* sanitize environment variables ([a90f9ad](https://github.com/iendeavor/import-meta-env/commit/a90f9ad47dec0b7903ddfe9f1cd73bc975d78a19))

### [0.1.6](https://github.com/iendeavor/import-meta-env/compare/cli0.1.5...cli0.1.6) (2022-03-22)


### Bug Fixes

* dotenv@11 drop support node@10 ([9406384](https://github.com/iendeavor/import-meta-env/commit/940638468ce164a214a74dbd11035c1cf4898759))

### [0.1.5](https://github.com/iendeavor/import-meta-env/compare/cli0.1.4...cli0.1.5) (2022-03-17)

### [0.1.4](https://github.com/iendeavor/import-meta-env/compare/cli0.1.3...cli0.1.4) (2022-03-10)


### Features

* support dotenv@8, 9, 10 too ([f7af582](https://github.com/iendeavor/import-meta-env/commit/f7af5828a716c3348a8373e50b0e20c9c42c86c3))
* update description ([48bc6a7](https://github.com/iendeavor/import-meta-env/commit/48bc6a71a1c00b5066a376f07c44fd5204fa9fd7))

### [0.1.3](https://github.com/iendeavor/import-meta-env/compare/cli0.1.2...cli0.1.3) (2022-03-04)


### Features

* add common output paths to paths ([96b6408](https://github.com/iendeavor/import-meta-env/commit/96b6408487f2323bfad6ac00e5804255cc2d70e7))
* add disposable option ([b380d4b](https://github.com/iendeavor/import-meta-env/commit/b380d4bfdccf8186fbf2917184e0bd651c3bd19a))
* for security reasons, example file paths should be explicitly defined ([23b098f](https://github.com/iendeavor/import-meta-env/commit/23b098f0a5921dabfdd51cab1d345cc0c8c0eda1))


### Bug Fixes

* it should load user-defined example file instead of hardcoding .env.example ([329002b](https://github.com/iendeavor/import-meta-env/commit/329002b2f6f79162096463f3bd8558d680b4fe7b))
* use windows native sep ([97488b0](https://github.com/iendeavor/import-meta-env/commit/97488b06b771171b219478da16721ae893295952))
* when used with arrow functions, it should wrap the environment variable in parentheses ([3907232](https://github.com/iendeavor/import-meta-env/commit/3907232f8430be0c2e2f0133eb0140617663ccbf))

### [0.1.2](https://github.com/iendeavor/import-meta-env/compare/cli0.1.1...cli0.1.2) (2022-03-02)


### Bug Fixes

* ignore source map files ([4b04db7](https://github.com/iendeavor/import-meta-env/commit/4b04db7fea793a5eb25db08da0ad2cf796cac0a0))
* prevent syntax error being throwed ([9f6647d](https://github.com/iendeavor/import-meta-env/commit/9f6647dea60890b94cd56cd9e427472640150d45))

### [0.1.1](https://github.com/iendeavor/import-meta-env/compare/cli0.1.0...cli0.1.1) (2022-02-28)


### Bug Fixes

* ignore files which dons't contain placholder ([077ce8d](https://github.com/iendeavor/import-meta-env/commit/077ce8d2226d4a10aacf2805d58e44cf4ea1801a))

## 0.1.0 (2022-02-27)


### Features

* separate packages ([e030beb](https://github.com/iendeavor/import-meta-env/commit/e030beba3217f6d85f82f9a4ad724516fbcb1160))
