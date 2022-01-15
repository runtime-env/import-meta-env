export const key = "__runtime_config__";

const scriptTemplateBegin = `<!--${key} BEGIN-->`;
const scriptTemplateEnd = `<!--${key} END-->`;
export const scriptTemplate = [scriptTemplateBegin, scriptTemplateEnd].join("");
