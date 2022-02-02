const a=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function o(r){const t={};let s=r.toString();s=s.replace(/\r\n?/mg,`
`);let n;for(;(n=a.exec(s))!=null;){const c=n[1];let e=n[2]||"";e=e.trim();const l=e[0];e=e.replace(/^(['"])([\s\S]+)\1$/mg,"$2"),l==='"'&&(e=e.replace(/\\n/g,`
`),e=e.replace(/\\r/g,"\r")),t[c]=e}return t}const i=o(`VITE_NAME=vite-plugin-dotenv
`);var p=Object.assign(i,{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1});export{p as e};
