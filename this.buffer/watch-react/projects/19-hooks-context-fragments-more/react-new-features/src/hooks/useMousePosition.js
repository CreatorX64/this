import { useEffect, useState } from "react";

export function useMousePosition(defaultPosition = { x: 0, y: 0 }) {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({ x: e.pageX, y: e.pageY });
    }

    document.addEventListener("mousemove", handleMouseMove);

    return function () {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}
