// https://github.com/motdotla/dotenv/blob/v14.3.2/lib/main.js#L9-L80
export const parseSnippet = `
const NEWLINE = '\\n'
const RE_INI_KEY_VAL = /^\\s*([\\w.-]+)\\s*=\\s*("[^"]*"|'[^']*'|.*?)(\\s+#.*)?$/
const RE_NEWLINES = /\\\\n/g
const NEWLINES_MATCH = /\\r\\n|\\n|\\r/

// Parses src into an Object
function parse (src, options) {
  const debug = Boolean(options && options.debug)
  const multiline = Boolean(options && options.multiline)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  const lines = src.toString().split(NEWLINES_MATCH)

  for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx]

    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      let end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      const isMultilineDoubleQuoted = val[0] === '"' && val[end] !== '"'
      const isMultilineSingleQuoted = val[0] === "'" && val[end] !== "'"

      // if parsing line breaks and the value starts with a quote
      if (multiline && (isMultilineDoubleQuoted || isMultilineSingleQuoted)) {
        const quoteChar = isMultilineDoubleQuoted ? '"' : "'"

        val = val.substring(1)

        while (idx++ < lines.length - 1) {
          line = lines[idx]
          end = line.length - 1
          if (line[end] === quoteChar) {
            val += NEWLINE + line.substring(0, end)
            break
          }
          val += NEWLINE + line
        }
      // if single or double quoted, remove quotes
      } else if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      const trimmedLine = line.trim()

      // ignore empty and commented lines
      if (trimmedLine.length && trimmedLine[0] !== '#') {
        log(\`Failed to match key and value when parsing line \\\${idx + 1}: \\\${line}\`)
      }
    }
  }

  return obj
}
`.trim();
