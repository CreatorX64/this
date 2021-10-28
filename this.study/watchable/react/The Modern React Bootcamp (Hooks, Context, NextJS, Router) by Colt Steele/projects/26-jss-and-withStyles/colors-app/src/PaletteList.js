/** @jsxImportSource @emotion/react */

import { Component } from "react";
import MiniPalette from "./MiniPalette";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    backgroundColor: "blue"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "50%"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "#fff"
  },
  palettes: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    width: "100%",
    boxSizing: "border-box"
  }
};

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;

    return (
      <div css={styles.root}>
        <div css={styles.container}>
          <nav css={styles.nav}>
            <h1>React Colors</h1>
          </nav>
          <div css={styles.palettes}>
            {palettes.map((palette) => (
              <MiniPalette {...palette} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
