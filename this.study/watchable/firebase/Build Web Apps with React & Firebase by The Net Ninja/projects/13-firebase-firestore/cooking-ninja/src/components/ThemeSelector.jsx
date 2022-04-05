import { useTheme } from "../hooks/useTheme";
import styles from "./ThemeSelector.module.css";
import modeIcon from "../assets/mode-icon.svg";

const colors = ["#58249c", "#249c6b", "#b70233"];

export const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.selector}>
      <div className={styles.modeToggle}>
        <img
          src={modeIcon}
          alt="Dark/light toggle icon"
          onClick={toggleMode}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className={styles.buttons}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};
