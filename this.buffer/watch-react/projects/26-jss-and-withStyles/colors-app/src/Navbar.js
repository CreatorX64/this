import { Component } from "react";
import { Link } from "react-router-dom";
import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", isSnackbarOpen: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(event) {
    this.setState({ format: event.target.value, isSnackbarOpen: true });
    this.props.changeFormat(event.target.value);
  }

  closeSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">React Color Picker</Link>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChange={changeLevel}
              // onAfterChange={changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}
