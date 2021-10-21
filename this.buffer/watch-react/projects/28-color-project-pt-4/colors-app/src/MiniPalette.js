import { withStyles } from "@mui/styles";

const styles = {
  root: {
    position: "relative",
    border: "1px solid #000",
    borderRadius: "5px",
    padding: "0.5rem",
    // overflow: "hidden",
    backgroundColor: "#fff",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    width: "100%",
    height: "120px",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#dae1e4"
  },
  miniColor: {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "25%",
    margin: "0 auto",
    marginBottom: "-4px"
  },
  title: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    color: "#000"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  }
};

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors, handleClick } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      key={color.id}
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
