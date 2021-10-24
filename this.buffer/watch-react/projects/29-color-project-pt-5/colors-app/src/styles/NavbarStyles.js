const styles = {
  Navbar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    marginRight: "15px",
    padding: "0 13px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    "& a": {
      textDecoration: "none",
      color: "#000"
    }
  },
  slider: {
    display: "inline-block",
    width: "340px",
    margin: "0 16px",
    "& .rc-slider-track": {
      backgroundColor: "transparent"
    },
    "& .rc-slider-rail": {
      height: "8px"
    },
    "& .rc-slider-handle, & .rc-slider-handle:active, & .rc-slider-handle:focus, & .rc-slider-handle:hover":
      {
        width: "13px",
        height: "13px",
        marginTop: "-3px",
        border: "2px solid green",
        outline: "none",
        boxShadow: "none",
        backgroundColor: "green"
      }
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem"
  }
};

export default styles;
