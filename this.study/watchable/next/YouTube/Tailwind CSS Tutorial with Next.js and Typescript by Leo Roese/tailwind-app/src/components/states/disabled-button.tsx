const DisabledButton = (): JSX.Element => {
  return (
    <button
      className="cursor-pointer bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled
    >
      Submit
    </button>
  );
};

export default DisabledButton;
