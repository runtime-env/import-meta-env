---
layout: home

title: Import-meta-env
titleTemplate: Build once, deploy anywhere

hero:
  name: Import-meta-env
  text: Build once, deploy anywhere
  tagline: Startup/Runtime environment variable solution for JavaScript. It helps in developing applications following the 12-factor principles.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started/introduction.html#guide
    - theme: alt
      text: Examples
      link: https://github.com/iendeavor/import-meta-env/tree/main/packages/examples

features:
  - title: Security First
    details: No environment variables will be exposed to clients unless you define it in a .env.example file.
  - title: Compile Safe
    details: No more forgetting to provide environment variables. Using Import-meta-env, if your code compiles, it works.
  - title: Type-safe
    details: No more typos. Import-meta-env automatically generates types for your environment variables by using the .env.example file as a source of type information.
  - title: Framework Agnostic
    details: Support for Babel, SWC, and Unplugin for ESbuild, Rollup, Vite, and Webpack.
  - title: Adoptable
    details: Designed with a generic approach in mind, CSR and SSR, transpilers, bundlers, and even micro frontend are all supported.
  - title: Save Time & Money
    details: Speed up your CI/CD pipeline, you no longer need to build multiple bundles for different stages.
---
