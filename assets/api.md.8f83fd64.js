import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.1169fbc9.js";const m=JSON.parse('{"title":"API","description":"","frontmatter":{},"headers":[],"relativePath":"api.md","filePath":"api.md"}'),l={name:"api.md"},e=p(`<h1 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h1><h2 id="import-meta-env-babel" tabindex="-1">@import-meta-env/babel <a class="header-anchor" href="#import-meta-env-babel" aria-label="Permalink to &quot;@import-meta-env/babel&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PluginOptions</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The .env file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * You can out-out this by passing an empty string</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@default</span><span style="color:#6A737D;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">.env</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">env</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The public .env example file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">example</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@default</span></span>
<span class="line"><span style="color:#6A737D;">   * p<wbr>rocess.env.NODE_ENV === &quot;production&quot; ? &quot;runtime&quot; : &quot;compile-time&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">transformMode</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;compile-time&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;runtime&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PluginOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The .env file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * You can out-out this by passing an empty string</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@default</span><span style="color:#6A737D;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">.env</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">env</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The public .env example file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">example</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@default</span></span>
<span class="line"><span style="color:#6A737D;">   * p<wbr>rocess.env.NODE_ENV === &quot;production&quot; ? &quot;runtime&quot; : &quot;compile-time&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">transformMode</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;compile-time&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;runtime&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="import-meta-env-cli" tabindex="-1">@import-meta-env/cli <a class="header-anchor" href="#import-meta-env-cli" aria-label="Permalink to &quot;@import-meta-env/cli&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">import-meta-env</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">import-meta-env</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--help</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Usage: import-meta-env [options]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Populates your environment variables from the system or \`.env\` file.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">  -V, --version           output the version number</span></span>
<span class="line"><span style="color:#e1e4e8;">  -e, --env &lt;path&gt;        The .env file path to load. You can out-out this by</span></span>
<span class="line"><span style="color:#e1e4e8;">                          passing an empty string. (default: &quot;.env&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x, --example &lt;path&gt;    The .env example file path to load</span></span>
<span class="line"><span style="color:#e1e4e8;">  -o, --output &lt;path...&gt;  [deprecated: use --path] The file/dir paths to inject</span></span>
<span class="line"><span style="color:#e1e4e8;">                          in-place (default:</span></span>
<span class="line"><span style="color:#e1e4e8;">                          [&quot;dist/**/*&quot;,&quot;.next/**/*&quot;,&quot;.nuxt/**/*&quot;,&quot;.output/**/*&quot;,&quot;build/**/*&quot;])</span></span>
<span class="line"><span style="color:#e1e4e8;">  -p, --path &lt;path...&gt;    The file/dir paths to inject in-place (default:</span></span>
<span class="line"><span style="color:#e1e4e8;">                          [&quot;dist/**/*&quot;,&quot;.next/**/*&quot;,&quot;.nuxt/**/*&quot;,&quot;.output/**/*&quot;,&quot;build/**/*&quot;])</span></span>
<span class="line"><span style="color:#e1e4e8;">  --disposable            Do not create backup files and restore from backup</span></span>
<span class="line"><span style="color:#e1e4e8;">                          files. In local development, disable this option to</span></span>
<span class="line"><span style="color:#e1e4e8;">                          avoid rebuilding the project when environment</span></span>
<span class="line"><span style="color:#e1e4e8;">                          variable changes, In production, enable this option</span></span>
<span class="line"><span style="color:#e1e4e8;">                          to avoid generating unnecessary backup files.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h, --help              display help for command</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Usage: import-meta-env [options]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Populates your environment variables from the system or \`.env\` file.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">  -V, --version           output the version number</span></span>
<span class="line"><span style="color:#24292e;">  -e, --env &lt;path&gt;        The .env file path to load. You can out-out this by</span></span>
<span class="line"><span style="color:#24292e;">                          passing an empty string. (default: &quot;.env&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  -x, --example &lt;path&gt;    The .env example file path to load</span></span>
<span class="line"><span style="color:#24292e;">  -o, --output &lt;path...&gt;  [deprecated: use --path] The file/dir paths to inject</span></span>
<span class="line"><span style="color:#24292e;">                          in-place (default:</span></span>
<span class="line"><span style="color:#24292e;">                          [&quot;dist/**/*&quot;,&quot;.next/**/*&quot;,&quot;.nuxt/**/*&quot;,&quot;.output/**/*&quot;,&quot;build/**/*&quot;])</span></span>
<span class="line"><span style="color:#24292e;">  -p, --path &lt;path...&gt;    The file/dir paths to inject in-place (default:</span></span>
<span class="line"><span style="color:#24292e;">                          [&quot;dist/**/*&quot;,&quot;.next/**/*&quot;,&quot;.nuxt/**/*&quot;,&quot;.output/**/*&quot;,&quot;build/**/*&quot;])</span></span>
<span class="line"><span style="color:#24292e;">  --disposable            Do not create backup files and restore from backup</span></span>
<span class="line"><span style="color:#24292e;">                          files. In local development, disable this option to</span></span>
<span class="line"><span style="color:#24292e;">                          avoid rebuilding the project when environment</span></span>
<span class="line"><span style="color:#24292e;">                          variable changes, In production, enable this option</span></span>
<span class="line"><span style="color:#24292e;">                          to avoid generating unnecessary backup files.</span></span>
<span class="line"><span style="color:#24292e;">  -h, --help              display help for command</span></span></code></pre></div><h2 id="import-meta-env-flow" tabindex="-1">@import-meta-env/flow <a class="header-anchor" href="#import-meta-env-flow" aria-label="Permalink to &quot;@import-meta-env/flow&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">import-meta-env-flow</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">import-meta-env-flow</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--help</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Usage: import-meta-env-flow [options]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Generate flow type from .env.example</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">  -V, --version         output the version number</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x, --example &lt;path&gt;  The .env example file path to load</span></span>
<span class="line"><span style="color:#e1e4e8;">  -o, --outDir &lt;path&gt;   Specify an output folder for emitted file. (default:</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &quot;.&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h, --help            display help for command</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Usage: import-meta-env-flow [options]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Generate flow type from .env.example</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">  -V, --version         output the version number</span></span>
<span class="line"><span style="color:#24292e;">  -x, --example &lt;path&gt;  The .env example file path to load</span></span>
<span class="line"><span style="color:#24292e;">  -o, --outDir &lt;path&gt;   Specify an output folder for emitted file. (default:</span></span>
<span class="line"><span style="color:#24292e;">                        &quot;.&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  -h, --help            display help for command</span></span></code></pre></div><h2 id="import-meta-env-prepare" tabindex="-1">@import-meta-env/prepare <a class="header-anchor" href="#import-meta-env-prepare" aria-label="Permalink to &quot;@import-meta-env/prepare&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">import-meta-env-prepare</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">import-meta-env-prepare</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--help</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Usage: import-meta-env-prepare [options]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Generate \`.env\` file from \`.env.*\` files.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">  -V, --version           output the version number</span></span>
<span class="line"><span style="color:#e1e4e8;">  -e, --env &lt;path&gt;        .env file path to write (default: &quot;.env&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x, --example &lt;path&gt;    .env.example file path to read</span></span>
<span class="line"><span style="color:#e1e4e8;">  -p, --path &lt;path...&gt;    .env.* file paths to read (default:</span></span>
<span class="line"><span style="color:#e1e4e8;">                          [&quot;.env.local.defaults&quot;,&quot;.env.local&quot;])</span></span>
<span class="line"><span style="color:#e1e4e8;">  -u, --user-environment  whether to load user environment variables (i.e.,</span></span>
<span class="line"><span style="color:#e1e4e8;">                          p<wbr>rocess.env.*) (default: false)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h, --help              display help for command</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Usage: import-meta-env-prepare [options]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Generate \`.env\` file from \`.env.*\` files.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">  -V, --version           output the version number</span></span>
<span class="line"><span style="color:#24292e;">  -e, --env &lt;path&gt;        .env file path to write (default: &quot;.env&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  -x, --example &lt;path&gt;    .env.example file path to read</span></span>
<span class="line"><span style="color:#24292e;">  -p, --path &lt;path...&gt;    .env.* file paths to read (default:</span></span>
<span class="line"><span style="color:#24292e;">                          [&quot;.env.local.defaults&quot;,&quot;.env.local&quot;])</span></span>
<span class="line"><span style="color:#24292e;">  -u, --user-environment  whether to load user environment variables (i.e.,</span></span>
<span class="line"><span style="color:#24292e;">                          p<wbr>rocess.env.*) (default: false)</span></span>
<span class="line"><span style="color:#24292e;">  -h, --help              display help for command</span></span></code></pre></div><h2 id="import-meta-env-swc" tabindex="-1">@import-meta-env/swc <a class="header-anchor" href="#import-meta-env-swc" aria-label="Permalink to &quot;@import-meta-env/swc&quot;">​</a></h2><div class="language-rs vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">rs</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">use</span><span style="color:#E1E4E8;"> serde;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#[derive(serde</span><span style="color:#F97583;">::</span><span style="color:#B392F0;">Serialize</span><span style="color:#E1E4E8;">, serde</span><span style="color:#F97583;">::</span><span style="color:#B392F0;">Deserialize</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#F97583;">pub</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Config</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * The .env file path to load, related to current working directory.</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * Defaults to &quot;.env&quot;</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pub</span><span style="color:#E1E4E8;"> env</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Option</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * The public .env example file path to load, related to current working directory.</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pub</span><span style="color:#E1E4E8;"> example</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">     * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * Default:</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * if \`TransformPluginMetadataContextKind::Env\` equals to \`&quot;production&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">     * then \`Some(TransformMode::Runtime)\`</span></span>
<span class="line"><span style="color:#6A737D;">     * otherwise \`Some(TransformMode::CompileTime)\`</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    #[serde(rename </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;transformMode&quot;</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pub</span><span style="color:#E1E4E8;"> transform_mode</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Option</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">TransformMode</span><span style="color:#E1E4E8;">&gt;,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#[derive(serde</span><span style="color:#F97583;">::</span><span style="color:#B392F0;">Serialize</span><span style="color:#E1E4E8;">, serde</span><span style="color:#F97583;">::</span><span style="color:#B392F0;">Deserialize</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#F97583;">pub</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TransformMode</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    #[serde(rename </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;compile-time&quot;</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">CompileTime</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    #[serde(rename </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;runtime&quot;</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Runtime</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">use</span><span style="color:#24292E;"> serde;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#[derive(serde</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Serialize</span><span style="color:#24292E;">, serde</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Deserialize</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Config</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * The .env file path to load, related to current working directory.</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * Defaults to &quot;.env&quot;</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> env</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Option</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * The public .env example file path to load, related to current working directory.</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> example</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">     * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">     * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * Default:</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * if \`TransformPluginMetadataContextKind::Env\` equals to \`&quot;production&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">     * then \`Some(TransformMode::Runtime)\`</span></span>
<span class="line"><span style="color:#6A737D;">     * otherwise \`Some(TransformMode::CompileTime)\`</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    #[serde(rename </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;transformMode&quot;</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> transform_mode</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Option</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">TransformMode</span><span style="color:#24292E;">&gt;,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#[derive(serde</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Serialize</span><span style="color:#24292E;">, serde</span><span style="color:#D73A49;">::</span><span style="color:#6F42C1;">Deserialize</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#D73A49;">pub</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TransformMode</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    #[serde(rename </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;compile-time&quot;</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">CompileTime</span><span style="color:#24292E;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    #[serde(rename </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;runtime&quot;</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Runtime</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="import-meta-env-typescript" tabindex="-1">@import-meta-env/typescript <a class="header-anchor" href="#import-meta-env-typescript" aria-label="Permalink to &quot;@import-meta-env/typescript&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">import-meta-env-typescript</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">import-meta-env-typescript</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--help</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Usage: import-meta-env-typescript [options]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Generate declaration file from .env.example</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">  -V, --version         output the version number</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x, --example &lt;path&gt;  The .env example file path to load</span></span>
<span class="line"><span style="color:#e1e4e8;">  -o, --outDir &lt;path&gt;   Specify an output folder for emitted file. (default:</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &quot;.&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h, --help            display help for command</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Usage: import-meta-env-typescript [options]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Generate declaration file from .env.example</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">  -V, --version         output the version number</span></span>
<span class="line"><span style="color:#24292e;">  -x, --example &lt;path&gt;  The .env example file path to load</span></span>
<span class="line"><span style="color:#24292e;">  -o, --outDir &lt;path&gt;   Specify an output folder for emitted file. (default:</span></span>
<span class="line"><span style="color:#24292e;">                        &quot;.&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  -h, --help            display help for command</span></span></code></pre></div><h2 id="import-meta-env-unplugin" tabindex="-1">@import-meta-env/unplugin <a class="header-anchor" href="#import-meta-env-unplugin" aria-label="Permalink to &quot;@import-meta-env/unplugin&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Env</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Record</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PluginOptions</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The .env file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * You can out-out this by passing an empty string</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@default</span><span style="color:#6A737D;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">.env</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">env</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The public .env example file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">example</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@default</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * \`\`\`text</span></span>
<span class="line"><span style="color:#6A737D;">   * vite:    if mode is not \`&quot;production&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * webpack: if mode is \`&quot;development&quot;\` or \`&quot;none&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * rollup:  if \`NODE_ENV\` is not \`&quot;production&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * esbuild: (needs to be set explicitly)</span></span>
<span class="line"><span style="color:#6A737D;">   * \`\`\`</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">transformMode</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;compile-time&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;runtime&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Env</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Record</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">&gt;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PluginOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The .env file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * You can out-out this by passing an empty string</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@default</span><span style="color:#6A737D;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">.env</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">env</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * The public .env example file path to load</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">example</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * Compile-time: statically replace \`i<wbr>mport.meta.env.KEY\` with \`&quot;value&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * Runtime: statically replace \`i<wbr>mport.meta.env\` with a global accessor</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@default</span></span>
<span class="line"><span style="color:#6A737D;">   *</span></span>
<span class="line"><span style="color:#6A737D;">   * \`\`\`text</span></span>
<span class="line"><span style="color:#6A737D;">   * vite:    if mode is not \`&quot;production&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * webpack: if mode is \`&quot;development&quot;\` or \`&quot;none&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * rollup:  if \`NODE_ENV\` is not \`&quot;production&quot;\` then \`&quot;compile-time&quot;\`, otherwise \`&quot;runtime&quot;\`</span></span>
<span class="line"><span style="color:#6A737D;">   * esbuild: (needs to be set explicitly)</span></span>
<span class="line"><span style="color:#6A737D;">   * \`\`\`</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">transformMode</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;compile-time&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;runtime&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,19),o=[e];function t(c,r,i,y,u,E){return n(),a("div",null,o)}const h=s(l,[["render",t]]);export{m as __pageData,h as default};
