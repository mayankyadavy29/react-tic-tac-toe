import { STARTING_PLAYER_WON } from "../constants";
function Score({ score, playerWon, playerTurn }) {
  return (
    <div>
      <p className="score">{score["O"]}</p>
      <p className="score">{score["X"]}</p>
      <p
        className={`score ${
          playerWon === STARTING_PLAYER_WON && playerTurn == "O"
            ? "score-border"
            : null
        }`}
      >
        PLAYER O
      </p>
      <p
        className={`score ${
          playerWon === STARTING_PLAYER_WON && playerTurn == "X"
            ? "score-border"
            : null
        }`}
      >
        PLAYER X
      </p>
    </div>
  );
}
export default Score;
