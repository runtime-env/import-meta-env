# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/iendeavor/import-meta-env/compare/swc0.1.0...swc0.3.0) (2022-11-06)


### ⚠ BREAKING CHANGES

* use 'env' instead of 'env_path', use 'example' instead of 'env_example_path'
* you have to manually add a script tag to index.html
* drop support for nuxt and qwik for now
* remove shouldInlineEnv option, use transformMode option instead
* no longer support non-static property accessing

### Features

* add transformMode option ([954ab74](https://github.com/iendeavor/import-meta-env/commit/954ab746a04d0ff505be7d4daef8c7986c824b09))
* align config naming ([f2771af](https://github.com/iendeavor/import-meta-env/commit/f2771af849a38676b6a48d8da97c2861c95cf305))
* drop support for entire object and computed-property accessing ([4e4fd9a](https://github.com/iendeavor/import-meta-env/commit/4e4fd9aa54710eafbb79e79aa340ea53e0e864a7))


### Bug Fixes

* **deps:** update rust crate serde_json to 1.0.87 ([f7b8f06](https://github.com/iendeavor/import-meta-env/commit/f7b8f0612a99ff447d019e8130e164198839189c))
* **deps:** update rust crate swc_core to 0.40.10 ([aa1c1c6](https://github.com/iendeavor/import-meta-env/commit/aa1c1c6cf7a2bb59a3258efd7cb8179ba8d70e67))
* **deps:** update rust crate swc_core to 0.40.11 ([8fdfc25](https://github.com/iendeavor/import-meta-env/commit/8fdfc25f7e9e1689e09d4fd8d139311e05e2d5a5))
* **deps:** update rust crate swc_core to 0.40.13 ([45fc351](https://github.com/iendeavor/import-meta-env/commit/45fc351f63af522f29c42a9875e7e355c906f9e8))
* **deps:** update rust crate swc_core to 0.40.15 ([38a9e55](https://github.com/iendeavor/import-meta-env/commit/38a9e5578d362456130e880f461ad03333c360de))
* **deps:** update rust crate swc_core to 0.40.16 ([db74ed8](https://github.com/iendeavor/import-meta-env/commit/db74ed8e885424051a3215df39f0fe3f165719c1))
* **deps:** update rust crate swc_core to 0.40.17 ([95a8cec](https://github.com/iendeavor/import-meta-env/commit/95a8cec1997e02bd1fb52174c0479dc5531df467))
* **deps:** update rust crate swc_core to 0.40.20 ([2979aae](https://github.com/iendeavor/import-meta-env/commit/2979aae53bbebbabec61fdc14355c90575fefea3))
* **deps:** update rust crate swc_core to 0.40.21 ([ba21fbb](https://github.com/iendeavor/import-meta-env/commit/ba21fbb74767e9d4fc9810df673a68d0857f9a6d))
* **deps:** update rust crate swc_core to 0.40.25 ([7f5979e](https://github.com/iendeavor/import-meta-env/commit/7f5979e754ee0286efc587f684e55bb791b26fb0))
* **deps:** update rust crate swc_core to 0.40.26 ([98b80f1](https://github.com/iendeavor/import-meta-env/commit/98b80f150a898afa01e7b9ca9c882937ab7cf1fa))
* **deps:** update rust crate swc_core to 0.40.29 ([f4d5f02](https://github.com/iendeavor/import-meta-env/commit/f4d5f02cc21fb49da6023c3ab3beb3382b6a66d8))
* **deps:** update rust crate swc_core to 0.40.31 ([be51fa0](https://github.com/iendeavor/import-meta-env/commit/be51fa01b866a111b94dfb6adbd8ee740a731e40))
* **deps:** update rust crate swc_core to 0.40.33 ([dc70725](https://github.com/iendeavor/import-meta-env/commit/dc7072535d199a1f6b2109c4a20e2de8a8ce97ad))
* **deps:** update rust crate swc_core to 0.40.35 ([fafadc8](https://github.com/iendeavor/import-meta-env/commit/fafadc875cc19dd0eb7b19ad1b9a6c04baa5e006))
* **deps:** update rust crate swc_core to 0.40.36 ([d2cbe13](https://github.com/iendeavor/import-meta-env/commit/d2cbe1325f11f93b130cdfed6d04adc19346f4cc))
* **deps:** update rust crate swc_core to 0.40.37 ([66d1e1f](https://github.com/iendeavor/import-meta-env/commit/66d1e1f8c1a0177cc1e2888d4d14f1c43b1a41c9))
* **deps:** update rust crate swc_core to 0.40.38 ([328d651](https://github.com/iendeavor/import-meta-env/commit/328d651c49809b9526d70ba38e4a2f1e90eeefe8))
* **deps:** update rust crate swc_core to 0.40.40 ([28f8e3c](https://github.com/iendeavor/import-meta-env/commit/28f8e3cc9559f90ae600eb8164e66970a5cad00c))
* **deps:** update rust crate swc_core to 0.40.42 ([8d5165a](https://github.com/iendeavor/import-meta-env/commit/8d5165a492694ab141579f6f7fd9db1761b06c70))
* **deps:** update rust crate swc_core to 0.40.45 ([1603507](https://github.com/iendeavor/import-meta-env/commit/1603507e633e27003e78064fff22543750fbc5ea))
* **deps:** update rust crate swc_core to 0.40.46 ([7c9ad18](https://github.com/iendeavor/import-meta-env/commit/7c9ad185ad6c6f99fb83ec64777c4371a1421008))
* **deps:** update rust crate swc_core to 0.40.47 ([761d5ee](https://github.com/iendeavor/import-meta-env/commit/761d5eed7b75859df186ea9d12bbe11024bf6e2f))
* **deps:** update rust crate swc_core to 0.40.5 ([68198a5](https://github.com/iendeavor/import-meta-env/commit/68198a54e0499546bdeff03c9064b1960555ea58))
* **deps:** update rust crate swc_core to 0.40.9 ([6b682b3](https://github.com/iendeavor/import-meta-env/commit/6b682b3bb3f3768b53577760454ab6b574a00d30))
* generate correct source-maps ([4c1d81d](https://github.com/iendeavor/import-meta-env/commit/4c1d81dc929f104546671fb91e55c26f2fd4061a))

## 0.1.0 (2022-10-20)


### Features

* swc plugin ([19874ae](https://github.com/iendeavor/import-meta-env/commit/19874ae8829c10df5b74df34105f5e0be775b972))
