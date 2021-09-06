"use strict";

var isVisible = false;

var onToggleVisibility = function onToggleVisibility() {
  isVisible = !isVisible;
  render();
};

var render = function render() {
  var jsx = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Visibility Toggle"), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleVisibility
  }, isVisible ? "Hide details" : "Show details"), isVisible && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Hey. These are some details you can now see!")));
  ReactDOM.render(jsx, document.querySelector("#app"));
};

render();
