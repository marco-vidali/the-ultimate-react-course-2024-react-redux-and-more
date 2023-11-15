function RestartButton({ dispatch }) {
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "reset" })}>
      Restart Quiz
    </button>
  );
}

export default RestartButton;
