import Meta from "../components/Meta";

export default function About() {
  return (
    <div>
      {/* The Head inside this Meta component overrides the one we used in Layout */}
      <Meta title="About" />

      <h1>About</h1>
    </div>
  );
}
