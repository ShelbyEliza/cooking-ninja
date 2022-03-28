// styles:
import "./ThemeSelector.css";
import modeIcon from "../assets/mode-icon.svg";
import { useTheme } from "../hooks/useTheme";

const themeColors = ["#ffe0b1", "pink", "#f1d6d2"];

export default function ThemeSelector() {
  const { changeMode, mode, changeColor } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          onClick={toggleMode}
          src={modeIcon}
          alt="Icon used to toggle light and dark mode."
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
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
