import { useEffect, useState } from "react";

export const Route = ({ path, children }) => {
  // This state exists for the sole purpose of re-rendering the component when
  // popstate event is dispatched. We could've easily used window.location.pathname
  // directly in the JSX. However, we needed our component to re-render on the
  // event that location changes, so we introduced a dummy-like state that we update
  // in the popstate event handler. So in the end, our component will re-render
  // at each popstate event because we are changing the currentPath state in
  // the event handler.
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};
