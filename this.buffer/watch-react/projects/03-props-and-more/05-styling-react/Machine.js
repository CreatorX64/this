class Machine extends React.Component {
  render() {
    const { s1, s2, s3 } = this.props;
    const isWinner = s1 === s2 && s2 === s3;
    const styles = { fontSize: "50px", backgroundColor: "purple" };

    return (
      <div className="Machine">
        <p style={styles}>
          {s1} {s2} {s3}
        </p>
        <p className={isWinner ? "win" : "lose"}>
          {isWinner ? "Winner!" : "Loser!"}
        </p>
      </div>
    );
  }
}
