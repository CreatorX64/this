import { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export default class ColorBox extends Component {
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
    const { name, backgroundColor, moreUrl, showMoreLink } = this.props;
    const { isCopied } = this.state;

    return (
      <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
        <div style={{ backgroundColor }} className="ColorBox">
          <div
            style={{ backgroundColor }}
            className={`copy-overlay ${isCopied ? "show" : ""}`}
          />
          <div className={`copy-msg  ${isCopied ? "show" : ""}`}>
            <h1>Copied!</h1>
            <p>{backgroundColor}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          {showMoreLink && (
            <Link to={moreUrl} onClick={(event) => event.stopPropagation()}>
              <span className="see-more">More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
