function FinishedScreen({ points, highscore, maxPossiblePoints }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div className="result">
        <p>
          <span>{emoji}</span> You scored <strong>{points}</strong>
        </p>{" "}
        out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </div>
      <p className="hiscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishedScreen;
