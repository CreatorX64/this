import chroma from "chroma-js";

const styles = {
  ColorBox: {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: (props) => (props.showFullPalette ? "25%" : "50%"),
    marginBottom: "-4.5px",
    cursor: "pointer",
    "&:hover button": {
      opacity: "1"
    }
  },
  copyText: {
    color: (props) =>
      chroma(props.backgroundColor).luminance() <= 0.2 ? "#fff" : "#000"
  },
  colorName: {
    color: (props) =>
      chroma(props.backgroundColor).luminance() <= 0.2 ? "#fff" : "#000"
  },
  seeMore: {
    color: (props) =>
      chroma(props.backgroundColor).luminance() <= 0.2 ? "#fff" : "#000",
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "60px",
    height: "30px",
    border: "none",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  copyButton: {
    color: (props) =>
      chroma(props.backgroundColor).luminance() <= 0.2 ? "#fff" : "#000",
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    opacity: "0"
  },
  boxContent: {
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
    padding: "10px",
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#000"
  },
  copyOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    opacity: "0",
    transform: "scale(0.1)",
    transition: "transform 0.6s ease-in-out"
  },
  showOverlay: {
    opacity: "1",
    zIndex: "10",
    transform: "scale(50)"
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    opacity: "0",
    transform: "scale(0.1)",
    color: "#fff",
    "& h1": {
      width: "100%",
      marginBottom: "0",
      padding: "1rem",
      fontWeight: "400",
      textAlign: "center",
      textTransform: "uppercase",
      textShadow: "1px 2px #000",
      background: "rgba(255, 255, 255, 0.2)"
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "300"
    }
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "20",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s"
  }
};

export default styles;
