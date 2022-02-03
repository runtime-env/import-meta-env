# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.7](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.6...v0.1.7) (2022-02-03)


### Bug Fixes

* generates the same output if the source has not changed ([01b3c48](https://github.com/iendeavor/vite-plugin-dotenv/commit/01b3c48d473c96799b163aeed03adb80d92aaa80))
* sed command is different ([e39ca2e](https://github.com/iendeavor/vite-plugin-dotenv/commit/e39ca2e9dee4873b0adbadbd52aa478c5e03a1c4))
* should not override chunk file names ([68b22b0](https://github.com/iendeavor/vite-plugin-dotenv/commit/68b22b0ebf1fb7cd3d87f269f2732ca04c3082bf))

### [0.1.6](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.5...v0.1.6) (2022-02-02)


### Features

* expose SSR flag ([1561977](https://github.com/iendeavor/vite-plugin-dotenv/commit/1561977aca81e12a8b5446263c600edbc664dd2b))
* freeze env in development mode ([32dd7aa](https://github.com/iendeavor/vite-plugin-dotenv/commit/32dd7aa48d968a09b247e73dac210cc9acfd7716))
* parse with dotenv snippet to remove comment and support multiline feature ([f898dfc](https://github.com/iendeavor/vite-plugin-dotenv/commit/f898dfcf56eaad8c88cacd94c4ae9a7eb49ef2f7))
* seamless integration with import.meta.env ([32c23f1](https://github.com/iendeavor/vite-plugin-dotenv/commit/32c23f179eff7252204aac0a011a160e2b00a306))

### [0.1.5](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.4...v0.1.5) (2022-02-02)

### [0.1.4](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.3...v0.1.4) (2022-02-02)


### Features

* expose virtualFile option to avoid naming conflicts ([3d10d06](https://github.com/iendeavor/vite-plugin-dotenv/commit/3d10d06a9f2b72c349c28dbfa74bd1b19ae1145e))
* rename dotenv to .env ([9ca79fa](https://github.com/iendeavor/vite-plugin-dotenv/commit/9ca79fa73d198e64924c0eee42fc567eb658fefb))
* use env as virtual file to prevent some issues ([9aaf430](https://github.com/iendeavor/vite-plugin-dotenv/commit/9aaf43012528624d76f5c7a296c886d77f848aa1))


### Bug Fixes

* assets should not be wrote in development mode ([b41d060](https://github.com/iendeavor/vite-plugin-dotenv/commit/b41d06033fbef6603e465acdc5acb5d994f08afd))
* generated shell script should have execute permission ([fec81f5](https://github.com/iendeavor/vite-plugin-dotenv/commit/fec81f58e196cf851b4eba6be39d54474dacd026))

### [0.1.3](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.2...v0.1.3) (2022-02-01)


### Bug Fixes

* bundle binary ([69f7933](https://github.com/iendeavor/vite-plugin-dotenv/commit/69f79331ba59daad33f72c3db880e8802d66caf6))

### [0.1.2](https://github.com/iendeavor/vite-plugin-dotenv/compare/v0.1.1...v0.1.2) (2022-02-01)


### Features

* prevent to expose secret keys ([28dfefe](https://github.com/iendeavor/vite-plugin-dotenv/commit/28dfefea0ce754b0d709f58b710ad5b323a0c75b))

### 0.1.1 (2022-02-01)


### Features

* ability to replace .env as-is ([a85ac7b](https://github.com/iendeavor/vite-plugin-dotenv/commit/a85ac7b725ce245166fdb9b41c11645805ac254e))
* add binary ([4ca0f25](https://github.com/iendeavor/vite-plugin-dotenv/commit/4ca0f251f6fa187b361b4aeb4870523f0f0b6b2d))
* backup env file ([f92ef5c](https://github.com/iendeavor/vite-plugin-dotenv/commit/f92ef5c632a5d90ef3ac13ab5f6647b770154235))
* change color ([9bd627d](https://github.com/iendeavor/vite-plugin-dotenv/commit/9bd627dba685d73ebb460c7dd8702edcf5999392))
* force split env chunk ([5fbe3b5](https://github.com/iendeavor/vite-plugin-dotenv/commit/5fbe3b56b971e378c6940ba5dfeec443b8d1dfd9))
* import .env ([832e44a](https://github.com/iendeavor/vite-plugin-dotenv/commit/832e44a57f5796d3b80647da1d2862afdf3fb036))
* inject before preview ([7bd2320](https://github.com/iendeavor/vite-plugin-dotenv/commit/7bd23204c14b8fb6d403b23213f0bb1c2c737df9))
* inject-env ([7b8a77f](https://github.com/iendeavor/vite-plugin-dotenv/commit/7b8a77fd75939196c6493ad2761b42dea628ffdc))
* keep .env chunk file name be static ([b9d10db](https://github.com/iendeavor/vite-plugin-dotenv/commit/b9d10db78376c350bad2a62b0fc49089c9d70785))
* make env replacement as easy as possible ([8679c10](https://github.com/iendeavor/vite-plugin-dotenv/commit/8679c1074b07b9130d71afd5cf1491b4ebebce89))
* preserve built-in env variables ([34b0518](https://github.com/iendeavor/vite-plugin-dotenv/commit/34b0518576d5bdb4ead1d73fc3d3335b0ac38695))
* rename ([25608d7](https://github.com/iendeavor/vite-plugin-dotenv/commit/25608d73710fa8c0a0d0fcb0874a705a092bc39a))
* rename ([ac06efb](https://github.com/iendeavor/vite-plugin-dotenv/commit/ac06efbb062f6a663fc092910e52759522de626f))
* resolve ([5838c3f](https://github.com/iendeavor/vite-plugin-dotenv/commit/5838c3fdd83e3f31c42c9943bab5230c6db7e2ca))
* support legacy polyfill ([bba43ea](https://github.com/iendeavor/vite-plugin-dotenv/commit/bba43ea569680ad3455cf8ebde1473d74365bf36))
* update ([9de6180](https://github.com/iendeavor/vite-plugin-dotenv/commit/9de6180f72c65be99b0911914c8d2ac5ff2ed684))
* warn legacy ([be9577e](https://github.com/iendeavor/vite-plugin-dotenv/commit/be9577ee948ddd23a255fc5c6296950629ce40b0))


### Bug Fixes

* use assetsDir ([8cad5da](https://github.com/iendeavor/vite-plugin-dotenv/commit/8cad5da2dfbb410244812a108df4d7c323496715))

### 0.1.0 (2022-02-01)


### Features

* ability to replace .env as-is ([a85ac7b](https://github.com/iendeavor/vite-plugin-dotenv/commit/a85ac7b725ce245166fdb9b41c11645805ac254e))
* add binary ([4ca0f25](https://github.com/iendeavor/vite-plugin-dotenv/commit/4ca0f251f6fa187b361b4aeb4870523f0f0b6b2d))
* backup env file ([f92ef5c](https://github.com/iendeavor/vite-plugin-dotenv/commit/f92ef5c632a5d90ef3ac13ab5f6647b770154235))
* change color ([9bd627d](https://github.com/iendeavor/vite-plugin-dotenv/commit/9bd627dba685d73ebb460c7dd8702edcf5999392))
* force split env chunk ([5fbe3b5](https://github.com/iendeavor/vite-plugin-dotenv/commit/5fbe3b56b971e378c6940ba5dfeec443b8d1dfd9))
* import .env ([832e44a](https://github.com/iendeavor/vite-plugin-dotenv/commit/832e44a57f5796d3b80647da1d2862afdf3fb036))
* inject before preview ([7bd2320](https://github.com/iendeavor/vite-plugin-dotenv/commit/7bd23204c14b8fb6d403b23213f0bb1c2c737df9))
* inject-env ([7b8a77f](https://github.com/iendeavor/vite-plugin-dotenv/commit/7b8a77fd75939196c6493ad2761b42dea628ffdc))
* keep .env chunk file name be static ([b9d10db](https://github.com/iendeavor/vite-plugin-dotenv/commit/b9d10db78376c350bad2a62b0fc49089c9d70785))
* make env replacement as easy as possible ([8679c10](https://github.com/iendeavor/vite-plugin-dotenv/commit/8679c1074b07b9130d71afd5cf1491b4ebebce89))
* preserve built-in env variables ([34b0518](https://github.com/iendeavor/vite-plugin-dotenv/commit/34b0518576d5bdb4ead1d73fc3d3335b0ac38695))
* rename ([25608d7](https://github.com/iendeavor/vite-plugin-dotenv/commit/25608d73710fa8c0a0d0fcb0874a705a092bc39a))
* rename ([ac06efb](https://github.com/iendeavor/vite-plugin-dotenv/commit/ac06efbb062f6a663fc092910e52759522de626f))
* resolve ([5838c3f](https://github.com/iendeavor/vite-plugin-dotenv/commit/5838c3fdd83e3f31c42c9943bab5230c6db7e2ca))
* support legacy polyfill ([bba43ea](https://github.com/iendeavor/vite-plugin-dotenv/commit/bba43ea569680ad3455cf8ebde1473d74365bf36))
* update ([9de6180](https://github.com/iendeavor/vite-plugin-dotenv/commit/9de6180f72c65be99b0911914c8d2ac5ff2ed684))
* warn legacy ([be9577e](https://github.com/iendeavor/vite-plugin-dotenv/commit/be9577ee948ddd23a255fc5c6296950629ce40b0))


### Bug Fixes

* use assetsDir ([8cad5da](https://github.com/iendeavor/vite-plugin-dotenv/commit/8cad5da2dfbb410244812a108df4d7c323496715))
