const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    flex: "1",
    overflow: "hidden"
  },
  goBack: {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "50%",
    marginBottom: "-4.5px",
    cursor: "pointer",
    opacity: "1",
    backgroundColor: "#000",
    "& a": {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "inline-block",
      width: "100px",
      height: "30px",
      border: "none",
      outline: "none",
      textAlign: "center",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      textDecoration: "none",
      transform: "translate(-50%, -50%)",
      transition: "opacity 0.4s ease",
      cursor: "pointer",
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    }
  }
};

export default styles;
