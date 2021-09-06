let isVisible = false;

const onToggleVisibility = () => {
  isVisible = !isVisible;
  render();
};

const render = () => {
  const jsx = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={onToggleVisibility}>
        {isVisible ? "Hide details" : "Show details"}
      </button>
      {isVisible && (
        <div>
          <p>Hey. These are some details you can now see!</p>
        </div>
      )}
    </div>
  );

  ReactDOM.render(jsx, document.querySelector("#app"));
};

render();
