import chroma from "chroma-js";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "25%",
    marginBottom: "-4.5px",
    cursor: "pointer",
    backgroundColor: (props) => props.color,
    "&:hover svg": {
      color: "#fff",
      transform: "scale(1.5)"
    }
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
    color: (props) =>
      chroma(props.color).luminance() <= 0.08 ? "#fff" : "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out"
  }
};

function DraggableColorBox(props) {
  const { classes, name, handleClick } = props;

  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
