import { Component } from "react";
import { Cell } from "./Cell";
import { Neon } from "./Neon";
import "./Board.css";

export class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.getNewBoard()
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  getNewBoard() {
    const board = [];
    for (let y = 0; y < this.props.nRows; y++) {
      board[y] = [];
      for (let x = 0; x < this.props.nCols; x++) {
        board[y][x] = Math.random() < this.props.chanceLightStartsOn;
      }
    }
    return board;
  }

  flipCellsAround(coordinate) {
    let { nCols, nRows } = this.props;
    let { board } = this.state;
    let [y, x] = coordinate.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x); // Flip clicked cell
    flipCell(y, x - 1); // Flip left
    flipCell(y, x + 1); // Flip right
    flipCell(y - 1, x); // Flip above
    flipCell(y + 1, x); // Flip below

    let hasWon = this.state.board.every((row) =>
      row.every((isCellLit) => !isCellLit)
    );

    this.setState({ board, hasWon });
  }

  render() {
    const boardRows = this.state.board.map((row, y) => (
      <tr key={y}>
        {row.map((cellStatus, x) => (
          <Cell
            key={`${y}-${x}`}
            cellKey={`${y}-${x}`}
            flipCellsAroundMe={this.flipCellsAround}
            isLit={cellStatus}
          />
        ))}
      </tr>
    ));

    return (
      <div className="board">
        {this.state.hasWon ? (
          <Neon text="YOU WIN!" />
        ) : (
          <div>
            <Neon text="Lights Out" />
            <table className="board__table">
              <tbody>{boardRows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
