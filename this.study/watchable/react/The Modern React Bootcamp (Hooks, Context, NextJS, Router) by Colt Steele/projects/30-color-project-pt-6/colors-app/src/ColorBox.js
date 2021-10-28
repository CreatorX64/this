import { withStyles } from "@mui/styles";
import { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ isCopied: true }, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500);
    });
  }

  render() {
    const { classes, name, backgroundColor, moreUrl, showFullPalette } =
      this.props;
    const { isCopied } = this.state;

    return (
      <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
        <div style={{ backgroundColor }} className={classes.ColorBox}>
          <div
            style={{ backgroundColor }}
            className={`${classes.copyOverlay} ${
              isCopied ? classes.showOverlay : ""
            }`}
          />
          <div
            className={`${classes.copyMessage}  ${
              isCopied ? classes.showMessage : ""
            }`}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{backgroundColor}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showFullPalette && (
            <Link to={moreUrl} onClick={(event) => event.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
