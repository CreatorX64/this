import { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export class ColorBox extends Component {
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
    const { name, backgroundColor } = this.props;
    const { isCopied } = this.state;

    return (
      <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
        <div style={{ backgroundColor }} className="ColorBox">
          <div
            style={{ backgroundColor }}
            className={`ColorBox__overlay ${isCopied ? "show" : ""}`}
          />
          <div className={`ColorBox__copy-message  ${isCopied ? "show" : ""}`}>
            <h1>Copied!</h1>
            <p>{backgroundColor}</p>
          </div>
          <div className="ColorBox__container">
            <div className="ColorBox__content">
              <span>{name}</span>
            </div>
            <button className="ColorBox__copy-button">Copy</button>
          </div>
          <span className="ColorBox__see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}
