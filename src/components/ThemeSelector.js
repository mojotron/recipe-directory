import { useTheme } from "../hooks/useTheme";
import "./styles/ThemeSelector.css";
import toggleOn from "../assets/toggle_on.svg";
import toggleOff from "../assets/toggle_off.svg";

const themeColors = ["yellow", "white", "green"];

const ThemeSelector = () => {
  const { mode, changeColor, changeMode } = useTheme();

  return (
    <div className="ThemeSelector">
      <div className="ThemeSelector__mode">
        {mode === "light" ? (
          <img
            src={toggleOff}
            onClick={() => changeMode("dark")}
            alt="toggle on dark mode"
          />
        ) : (
          <img
            src={toggleOn}
            onClick={() => changeMode("light")}
            alt="toggle off dark mode"
          />
        )}
      </div>
      <div className="ThemeSelector__theme">
        {themeColors.map((color) => (
          <button
            className="ThemeSelector__btn"
            style={{ backgroundColor: `var(--${color})` }}
            key={color}
            onClick={() => changeColor(`var(--${color})`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
