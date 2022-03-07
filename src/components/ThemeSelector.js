// styles:
import "./ThemeSelector.css";

import { useTheme } from "../hooks/useTheme";

const themeColors = ["#ffe0b1", "pink", "#f1d6d2"];

export default function ThemeSelector() {
  const { changeColor } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
