function getNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

class NumPicker extends React.Component {
  render() {
    const number = getNumber();

    let message;
    if (number === 7) {
      message = (
        <div>
          <h2>CONGRATS YOU WIN!</h2>
          <img src="https://gifburg.com/images/gifs/happy-dance/gifs/0003.gif" />
        </div>
      );
    } else {
      message = <p>Sorry you lose!</p>;
    }

    return (
      <div>
        <h1>Your number is {number}</h1>

        {/* <p>{number === 7 ? "Congrats!" : "Unlucky!"}</p> */}

        {/* {number === 7 ? (
          <img src="https://gifburg.com/images/gifs/happy-dance/gifs/0003.gif" />
        ) : null} */}

        {/* {number === 7 && (
          <img src="https://gifburg.com/images/gifs/happy-dance/gifs/0003.gif" />
        )} */}

        {message}
      </div>
    );
  }
}
