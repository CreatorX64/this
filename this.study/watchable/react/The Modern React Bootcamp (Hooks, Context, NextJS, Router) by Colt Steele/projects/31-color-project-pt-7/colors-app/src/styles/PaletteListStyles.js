import bg from "./bg.svg";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: "1"
    },
    ".fade-exit-active": {
      opacity: "0",
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    backgroundColor: "#1e8feb",
    backgroundImage: `url(${bg})`
  },
  heading: {
    fontSize: "2rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "50%"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "#fff",
    "& a": {
      color: "#fff"
    }
  },
  palettes: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    width: "100%",
    boxSizing: "border-box"
  }
};

export default styles;
