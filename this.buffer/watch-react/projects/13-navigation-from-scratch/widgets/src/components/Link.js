import React from "react";

const Link = ({ className, href, children }) =>
{
  const onClick = (event) =>
  {
    // If the user held ctrlKey (or metaKey in Mac), we won't manipulate the
    // default behavior. The link should open in new tab as expected.
    if (event.metaKey || event.ctrlKey)
    {
      return;
    }

    event.preventDefault();

    window.history.pushState({}, "", href);
    
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;