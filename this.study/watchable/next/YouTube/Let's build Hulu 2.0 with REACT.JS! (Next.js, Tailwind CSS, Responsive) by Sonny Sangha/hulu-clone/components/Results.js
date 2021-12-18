import FlipMove from "react-flip-move";
import Thumbnail from "./Thumbnail";

export default function Results({ results }) {
  return (
    <FlipMove className="my-10 px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex 3xl:flex-wrap 3xl:justify-center">
      {results.map((result) => (
        <Thumbnail key={result.id} result={result} />
      ))}
    </FlipMove>
  );
}
