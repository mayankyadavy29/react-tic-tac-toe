import { STARTING_PLAYER_WON } from "../constants";
function PlayerMessage({ playerTurn, playerWon }) {
  return (
    <div>
      {playerTurn !== STARTING_PLAYER_WON &&
        playerWon === STARTING_PLAYER_WON && (
          <div>Player {playerTurn} should move</div>
        )}
      {playerTurn === STARTING_PLAYER_WON && <div>Draw !! Play Again</div>}
      {playerTurn !== STARTING_PLAYER_WON &&
        playerWon !== STARTING_PLAYER_WON && (
          <div
            className={
              playerWon !== STARTING_PLAYER_WON
                ? "player-message-animate"
                : null
            }
          >
            Player {playerWon} Won !! Play Again
          </div>
        )}
    </div>
  );
}
export default PlayerMessage;
