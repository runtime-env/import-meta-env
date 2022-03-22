import DefaultTheme from "vitepress/theme";
import "./custom.css";

if (typeof window !== "undefined") {
  import("darkreader").then((darkreader) => {
    // Enable when the system color scheme is dark.
    darkreader.auto({
      brightness: 100,
      contrast: 100,
    });
  });
}

export default DefaultTheme;
