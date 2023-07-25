"use strict";

var env = process.env;
var ADBLOCK = is(env.ADBLOCK);
var COLOR = is(env.npm_config_color);
var SILENT =
  ["silent", "error", "warn"].indexOf(env.npm_config_loglevel) !== -1;

// you could add a PR with an env variable for your CI detection
var CI = [
  "BUILD_NUMBER",
  "CI",
  "CONTINUOUS_INTEGRATION",
  "DRONE",
  "RUN_ID",
].some(function (it) {
  return is(env[it]);
});

var BANNER =
  "\u001B[96mThank you for using import-meta-env (\u001B[94m https://github.com/iendeavor/import-meta-env \u001B[96m) JavaScript library!\u001B[0m\n\n" +
  "\u001B[96mThe project needs your help! Please consider supporting import-meta-env:\u001B[0m\n" +
  "\u001B[96m>\u001B[94m https://bmc.link/iendeavor \u001B[0m\n" +
  "\u001B[96m>\u001B[94m https://paypal.me/iendeavor \u001B[0m\n\n";

function is(it) {
  return !!it && it !== "0" && it !== "false";
}

function isBannerRequired() {
  if (ADBLOCK || CI || SILENT) return false;
  return true;
}

function showBanner() {
  // eslint-disable-next-line no-console, regexp/no-control-character -- output
  console.log(COLOR ? BANNER : BANNER.replace(/\u001B\[\d+m/g, ""));
}

if (isBannerRequired()) showBanner();
