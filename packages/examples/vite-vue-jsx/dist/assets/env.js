const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function parse(src) {
  const obj = {};
  let lines = src.toString();
  lines = lines.replace(/\r\n?/mg, "\n");
  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];
    let value = match[2] || "";
    value = value.trim();
    const maybeQuote = value[0];
    value = value.replace(/^(['"])([\s\S]+)\1$/mg, "$2");
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, "\n");
      value = value.replace(/\\r/g, "\r");
    }
    obj[key] = value;
  }
  return obj;
}
const e = parse(`VITE_COMP=Comp
VITE_COMPS=Comps
VITE_INDEX=Index
VITE_MAIN=Main
VITE_SCRIPT=Script
VITE_SRC_IMPORT_JSX=SrcImportJsx
`);
var lyidiiyemdfoxopakumopqqehzfargppoteyouyebiansyzgzsvdxjjtshatcysfjumgjvcequxyzniwkojjnreyqjtxgvhwjgjahrmzcjoqbuiaaduffikyhqtfcmetruttmyehcmyqtitaymkrdidauktzigmrtpntfwjzsodmwctlnraifuptzfjwqdgalxoyvlcixaeykxmgmbelnnpawyzfeyrmhsqvfdjjqcgovhiwiptdnatqijttwvm = Object.assign(e, { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
export { lyidiiyemdfoxopakumopqqehzfargppoteyouyebiansyzgzsvdxjjtshatcysfjumgjvcequxyzniwkojjnreyqjtxgvhwjgjahrmzcjoqbuiaaduffikyhqtfcmetruttmyehcmyqtitaymkrdidauktzigmrtpntfwjzsodmwctlnraifuptzfjwqdgalxoyvlcixaeykxmgmbelnnpawyzfeyrmhsqvfdjjqcgovhiwiptdnatqijttwvm as l };
