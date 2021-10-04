export function Star(props) {
  const { value, color, isFilled, handleHover, handleHoverLeave, handleClick } =
    props;

  if (!handleHover) {
    return (
      <span
        className="Star"
        style={{ color }}
        onMouseEnter={() => console.log("HOVERED IN")}
        onMouseLeave={() => console.log("HOVERED OUT")}
        onClick={() => alert("CLICKED A STAR!")}
      >
        {isFilled ? "★" : "☆"}
      </span>
    );
  }

  return (
    <span
      className="Star"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave(value)}
      onClick={() => handleClick(value)}
    >
      {isFilled ? "★" : "☆"}
    </span>
  );
}
