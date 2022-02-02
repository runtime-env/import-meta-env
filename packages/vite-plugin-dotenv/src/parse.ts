// https://github.com/motdotla/dotenv/blob/c906decccf623581a67f2ac1d2046176e4e48470/lib/main.js#L5-L44
export const parseSnippet = `
const LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*"(?:\\\\"|[^"])*"|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg

// Parser src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\\r\\n?/mg, '\\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"])([\\s\\S]+)\\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\\\n/g, '\\n')
      value = value.replace(/\\\\r/g, '\\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}
`.trim();
