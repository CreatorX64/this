// Higher Order Component (HOC): A component (HOC) that renders another
// component. HOCs aim to facilitate code reuse, render hijacking, prop
// manipulation, and abstract state.

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => {
  return (
    <div>
      <h1>Info</h1>
      <p>The info is: {props.info}</p>
    </div>
  );
};

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="These are the details" />,
//   document.querySelector("#app")
// );

// Challenge

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to view the info</p>
      )}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="These are the details" />,
  document.querySelector("#app")
);
