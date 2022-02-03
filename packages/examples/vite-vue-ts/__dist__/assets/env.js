const o=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function a(r){const t={};let n=r.toString();n=n.replace(/\r\n?/mg,`
`);let s;for(;(s=o.exec(n))!=null;){const c=s[1];let e=s[2]||"";e=e.trim();const l=e[0];e=e.replace(/^(['"])([\s\S]+)\1$/mg,"$2"),l==='"'&&(e=e.replace(/\\n/g,`
`),e=e.replace(/\\r/g,"\r")),t[c]=e}return t}const i=a(`VITE_NAME=vite-plugin-dotenv
VITE_VSCODE=VSCode
VITE_ALT=Vue logo
`);var p=Object.assign(i,{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0});export{p as e};
