const l=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function o(s){const t={};let e=s.toString();e=e.replace(/\r\n?/mg,`
`);let n;for(;(n=l.exec(e))!=null;){const r=n[1];let x=n[2]||"";x=x.trim();const c=x[0];x=x.replace(/^(['"])([\s\S]+)\1$/mg,"$2"),c==='"'&&(x=x.replace(/\\n/g,`
`),x=x.replace(/\\r/g,"\r")),t[r]=x}return t}const a=o(`VITE_INLINE=inline-build
VITE_EFFECTIVE_MODE_FILE_NAME=.env.production
VITE_CUSTOM_ENV_VARIABLE=1
CUSTOM_PREFIX_ENV_VARIABLE=1
`);var i=Object.assign(a,{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0});export{i as v};
