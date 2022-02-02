const o=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function a(r){const s={};let n=r.toString();n=n.replace(/\r\n?/mg,`
`);let t;for(;(t=o.exec(n))!=null;){const l=t[1];let e=t[2]||"";e=e.trim();const c=e[0];e=e.replace(/^(['"])([\s\S]+)\1$/mg,"$2"),c==='"'&&(e=e.replace(/\\n/g,`
`),e=e.replace(/\\r/g,"\r")),s[l]=e}return s}const u=a(`VITE_INLINE=inline-buildqweqwe
VITE_EFFECTIVE_MODE_FILE_NAME=.env.production
VITE_CUSTOM_ENV_VARIABLE=1
CUSTOM_PREFIX_ENV_VARIABLE=1
`);var i=Object.assign(u,{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0});export{i as n};
