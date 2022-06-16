import useThemeContext from "hooks/useThemeContext";
import styles from "components/ThemeSelector.module.css";
import modeIcon from "assets/mode-icon.svg";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

const ThemeSelector = () => {
  const { mode, changeColor, changeMode } = useThemeContext();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.themeSelector}>
      <div className={styles.modeToggle}>
        <img
          src={modeIcon}
          aria-label="Toggle light/dark mode"
          alt="Toggle light/dark mode icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>

      <div className={styles.themeButtons}>
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
};

export default ThemeSelector;
