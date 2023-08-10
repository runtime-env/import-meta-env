import MagicString from "magic-string";
import { Replacement } from "./replacement";

export const replace = ({
  s,
  replacement,
}: {
  s: MagicString;
  replacement: Replacement;
}) => {
  const debug = process.env.DEBUG_IMPORT_META_ENV;

  debug && console.debug("---------------");
  debug &&
    console.debug(
      "--- replace ---",
      replacement.regexp,
      replacement.substitution,
    );
  debug && console.debug("--- before ---");
  debug && console.debug(s.toString());

  s.replace(replacement.regexp, replacement.substitution);

  debug && console.debug("--- after ---");
  debug && console.debug(s.toString());
};
