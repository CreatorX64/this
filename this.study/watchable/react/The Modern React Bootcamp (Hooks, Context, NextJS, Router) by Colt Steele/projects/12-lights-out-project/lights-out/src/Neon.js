import "./Neon.css";

export function Neon({ text }) {
  return (
    <div className="neon">
      {text.split(" ").map((word, idx) => (
        <div
          key={`${word}-${idx}`}
          className={`neon__${idx % 2 ? "blue" : "orange"}`}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
