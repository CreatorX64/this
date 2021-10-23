import { withStyles } from "@mui/styles";

const styles = {
  root: {
    position: "relative",
    display: "inline-block",
    width: "20%",
    height: "25%",
    marginBottom: "-4.5px",
    cursor: "pointer",
    backgroundColor: (props) => props.color
  }
};

function DraggableColorBox(props) {
  const { classes, name } = props;
  return <div className={classes.root}>{name}</div>;
}

export default withStyles(styles)(DraggableColorBox);
