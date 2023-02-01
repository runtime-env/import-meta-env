# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.4](https://github.com/iendeavor/import-meta-env/compare/unplugin0.4.3...unplugin0.4.4) (2023-02-01)

### [0.4.3](https://github.com/iendeavor/import-meta-env/compare/unplugin0.4.2...unplugin0.4.3) (2023-01-27)


### Bug Fixes

* cannot install newer version ([2f2cb3c](https://github.com/iendeavor/import-meta-env/commit/2f2cb3cb9f450b322d31bfeec4fa2b44826ba693))

### [0.4.2](https://github.com/iendeavor/import-meta-env/compare/unplugin0.4.1...unplugin0.4.2) (2023-01-25)


### Bug Fixes

* **deps:** update dependency unplugin to v1.0.1 ([2a3384d](https://github.com/iendeavor/import-meta-env/commit/2a3384d74db919c2002fa42167c92cc9eede7798))

### [0.4.1](https://github.com/iendeavor/import-meta-env/compare/unplugin0.4.0...unplugin0.4.1) (2022-12-11)


### Bug Fixes

* **deps:** update dependency magic-string to ^0.27.0 ([bb83aaf](https://github.com/iendeavor/import-meta-env/commit/bb83aafaf1433f469b9225c43a8bcc36e0377deb))
* should not load .env when env option is empty string ([7446f5f](https://github.com/iendeavor/import-meta-env/commit/7446f5f9adfc68e9c88191dfd9b0b7ab6f37fd4c))

## [0.4.0](https://github.com/iendeavor/import-meta-env/compare/unplugin0.3.2...unplugin0.4.0) (2022-11-27)


### ⚠ BREAKING CHANGES

* you need to replace script tag with another placeholder

### Features

* support for programmatically injecting scripts ([8da281d](https://github.com/iendeavor/import-meta-env/commit/8da281dd6eae0f43d4db92e1bbfe28f70f1065bf))


### Bug Fixes

* **deps:** update dependency unplugin to v1 ([47f24fa](https://github.com/iendeavor/import-meta-env/commit/47f24fafd62f7b31ed71d7ac1208c73c1f83cc98))

### [0.3.2](https://github.com/iendeavor/import-meta-env/compare/unplugin0.3.1...unplugin0.3.2) (2022-11-13)


### Bug Fixes

* **deps:** update unplugin to 0.10.2 ([bc853e6](https://github.com/iendeavor/import-meta-env/commit/bc853e6f77e0f787e9bc9665e172fe419824644a))

### [0.3.1](https://github.com/iendeavor/import-meta-env/compare/unplugin0.3.0...unplugin0.3.1) (2022-11-11)


### Bug Fixes

* generate source maps for webpack ([96d3b9d](https://github.com/iendeavor/import-meta-env/commit/96d3b9d8906856696aab5e37fcd5aca1cc1dde63))

## [0.3.0](https://github.com/iendeavor/import-meta-env/compare/unplugin0.2.1...unplugin0.3.0) (2022-11-06)


### ⚠ BREAKING CHANGES

* you have to manually add a script tag to index.html
* drop support for nuxt and qwik for now
* remove shouldInlineEnv option, use transformMode option instead
* no longer support non-static property accessing

### Features

* add transformMode option ([954ab74](https://github.com/iendeavor/import-meta-env/commit/954ab746a04d0ff505be7d4daef8c7986c824b09))
* drop support for entire object and computed-property accessing ([4e4fd9a](https://github.com/iendeavor/import-meta-env/commit/4e4fd9aa54710eafbb79e79aa340ea53e0e864a7))


### Bug Fixes

* **deps:** update dependency unplugin to ^0.10.0 ([9c6e06a](https://github.com/iendeavor/import-meta-env/commit/9c6e06accdf6a01ace0f07e62bed8798f9d7fd17))
* generate correct source-maps ([4c1d81d](https://github.com/iendeavor/import-meta-env/commit/4c1d81dc929f104546671fb91e55c26f2fd4061a))

### [0.2.1](https://github.com/iendeavor/import-meta-env/compare/unplugin0.2.0...unplugin0.2.1) (2022-10-16)


### Bug Fixes

* eval may being blocked by CSP ([8778ceb](https://github.com/iendeavor/import-meta-env/commit/8778ceb356c9696177a295c4347d3c5fc6f7f723))
* use object-assign for better backward compatibility ([6ba6596](https://github.com/iendeavor/import-meta-env/commit/6ba6596edf5c9f96020ca9809c7062545273880a))

## [0.2.0](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.10...unplugin0.2.0) (2022-10-13)


### Bug Fixes

* literal string (placeholder) may be removed by minifier ([10c567c](https://github.com/iendeavor/import-meta-env/commit/10c567c288dfee2da866910cf895fb1c00fa338d))

### [0.1.10](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.9...unplugin0.1.10) (2022-10-12)


### Bug Fixes

* import virtual module multiple times ([b47b603](https://github.com/iendeavor/import-meta-env/commit/b47b603a444a021bc891d7270dd40c119ee265d6)), closes [#15](https://github.com/iendeavor/import-meta-env/issues/15)
* vue files are not transformed when using with @vue/cli@5 ([c148f86](https://github.com/iendeavor/import-meta-env/commit/c148f865c9e4aca26f946f4b8b7d54fd8a75f81e))

### [0.1.9](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.8...unplugin0.1.9) (2022-10-10)


### ⚠ BREAKING CHANGES

* no longer support node 12
* default value of `shouldInlineEnv` is changed
* drop support for webpack 4
* no longer support node 12

### Features

* deprecate node 12 ([33003ca](https://github.com/iendeavor/import-meta-env/commit/33003ca1045dcaa28dde6d12f577b07aa6e0951a))
* no longer support node 12 ([9086406](https://github.com/iendeavor/import-meta-env/commit/908640683e0dff593816c75903da51f971943863))
* support angular cli ([a16ecfe](https://github.com/iendeavor/import-meta-env/commit/a16ecfebbecb5bfc57d98221bda0fd755458394f))
* support esbuild ([59ca8d2](https://github.com/iendeavor/import-meta-env/commit/59ca8d22048f59b99b9c4d735577313fa33a1a39))
* warn vite prefixed keys ([72fa434](https://github.com/iendeavor/import-meta-env/commit/72fa4344d7b9fd32355448d0ce5d7d9a2917d627)), closes [#14](https://github.com/iendeavor/import-meta-env/issues/14)


### Bug Fixes

* cannot work with vue cli when using package manager other than yarn ([5606334](https://github.com/iendeavor/import-meta-env/commit/5606334de3f1e1ff27b2c29ac029aeb396e7934f))
* cjs types ([ec36534](https://github.com/iendeavor/import-meta-env/commit/ec365346fb7e9b6b3b51bb97f6c3a80744273f7a))
* we may run build production in watch mode ([48539bf](https://github.com/iendeavor/import-meta-env/commit/48539bfde3823f82d24cfb43aa0bf9deef5cafa4))


### Build System

* bump unplugin ([b0fc120](https://github.com/iendeavor/import-meta-env/commit/b0fc120ff2c3c0b32f9fa6f41dbdf0192d6387e7))

### [0.1.8](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.7...unplugin0.1.8) (2022-03-22)


### Bug Fixes

* dotenv@11 drop support node@10 ([9406384](https://github.com/iendeavor/import-meta-env/commit/940638468ce164a214a74dbd11035c1cf4898759))
* should expose LEGACY and SSR flags ([18ead93](https://github.com/iendeavor/import-meta-env/commit/18ead9321ce0d4bb3eaa15dadb1573717070fa68))
* should not add import statement to html ([6b11b4d](https://github.com/iendeavor/import-meta-env/commit/6b11b4dc021e1bb0371814c5fa9fd881810c4b67))

### [0.1.7](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.6...unplugin0.1.7) (2022-03-15)


### Bug Fixes

* require webpack on demand ([f6304d0](https://github.com/iendeavor/import-meta-env/commit/f6304d0741f799b20a6b61d17dbef2eb88885a95))

### [0.1.6](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.5...unplugin0.1.6) (2022-03-13)


### Bug Fixes

* TS2330 ([846f86c](https://github.com/iendeavor/import-meta-env/commit/846f86c43582d1266fcc29715431d445ae3ee7b4))

### [0.1.5](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.4...unplugin0.1.5) (2022-03-11)


### Bug Fixes

* svelte file may contains multiple script tag ([ae4d23c](https://github.com/iendeavor/import-meta-env/commit/ae4d23ccf1f4329110779c627844ac95cedd3325))

### [0.1.4](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.3...unplugin0.1.4) (2022-03-10)


### Features

* support dotenv@8, 9, 10 too ([f7af582](https://github.com/iendeavor/import-meta-env/commit/f7af5828a716c3348a8373e50b0e20c9c42c86c3))

### [0.1.3](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.2...unplugin0.1.3) (2022-03-04)


### Features

* for security reasons, example file paths should be explicitly defined ([23b098f](https://github.com/iendeavor/import-meta-env/commit/23b098f0a5921dabfdd51cab1d345cc0c8c0eda1))
* make api consistent with cli ([8f0491c](https://github.com/iendeavor/import-meta-env/commit/8f0491cd85cca70c781f82ad3cfcd3dd4d37d01a))


### Bug Fixes

* it should load user-defined example file instead of hardcoding .env.example ([329002b](https://github.com/iendeavor/import-meta-env/commit/329002b2f6f79162096463f3bd8558d680b4fe7b))

### [0.1.2](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.1...unplugin0.1.2) (2022-03-02)


### Bug Fixes

* add missing import statement ([504d8f3](https://github.com/iendeavor/import-meta-env/commit/504d8f3fc9866fa3d48dfea1a888d810dd851f08))
* cannot resolve virtual module, inline placeholder for webpack instead ([470b4bb](https://github.com/iendeavor/import-meta-env/commit/470b4bbabb89700c59b3fc44f96203a66fe7a55d))
* missing parentheses when using with arrow functions ([3697ce7](https://github.com/iendeavor/import-meta-env/commit/3697ce7b0939dd6514a5e854f12348ac9bf47faa))
* **unplugin:** inline env when running in webpack/rollup watch mode ([aca790b](https://github.com/iendeavor/import-meta-env/commit/aca790bd3b8cffa7acd1b26667d2f031601e94d5))
* vue-cli webpack ImportMetaPlugin transforms unknown import.meta properties to void 0, intercept it ([083f6bc](https://github.com/iendeavor/import-meta-env/commit/083f6bc3c13a9ea86a3e92ac6fc29618daa7ce33))

### [0.1.1](https://github.com/iendeavor/import-meta-env/compare/unplugin0.1.0...unplugin0.1.1) (2022-02-28)


### Features

* add  option to support other bundlers ([f403bb4](https://github.com/iendeavor/import-meta-env/commit/f403bb422b97da7a385094d693ae16e73aa97406))


### Bug Fixes

* only process project code ([51d447a](https://github.com/iendeavor/import-meta-env/commit/51d447ac80ef66c4b36dd9b826d2e1f03a1ae9a6))
* rollup specific buildStart hook will be triggered when running with vite ([ee2f899](https://github.com/iendeavor/import-meta-env/commit/ee2f8990c5da056c6e927286dcb7277c5ed76acb))
* **webpack:** ImportMetaPlugin transforms unknown import.meta properties to void 0, intercept it ([cab3bab](https://github.com/iendeavor/import-meta-env/commit/cab3babbc5d9454ee290ab88c92ddc8a72d717ac))
* **webpack:** inline env in development mode ([02abb19](https://github.com/iendeavor/import-meta-env/commit/02abb19310b2ed7e187fbba6a569076509df2e74))
* **webpack:** it should only transform js related files ([8b625df](https://github.com/iendeavor/import-meta-env/commit/8b625df0f0f7bbc23bd2fb95e9ab90833bc1c342))

## 0.1.0 (2022-02-27)


### Features

* unplugin ([0c31de1](https://github.com/iendeavor/import-meta-env/commit/0c31de19d42c25b00f881abbae5e80c12b5dfe7e))


### Bug Fixes

* failed to resolve virtual file ([a48db64](https://github.com/iendeavor/import-meta-env/commit/a48db64e8f67d0858b8fc74d4cce0a632f95f083))
* **rollup:** add import-meta-env entry to manual chunks ([c4c4860](https://github.com/iendeavor/import-meta-env/commit/c4c4860ba7195d95b18f1258f3f6054cf6a5b0ba))
