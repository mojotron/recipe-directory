import { useTheme } from "../hooks/useTheme";
import "./styles/ThemeSelector.css";

const themeColors = ["yellow", "white", "green"];

const ThemeSelector = () => {
  const { changeColor } = useTheme();

  return (
    <div className="ThemeSelector">
      {themeColors.map((color) => (
        <button
          className="ThemeSelector__btn"
          style={{ backgroundColor: `var(--${color})` }}
          key={color}
          onClick={() => changeColor(`var(--${color})`)}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
