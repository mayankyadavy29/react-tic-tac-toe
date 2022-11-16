import { useState, useEffect } from "react";
import Header from "./Header";
import PlayerMessage from "./PlayerMessage";
import Board from "./Board";
import Score from "./Score";
import NewGame from "./NewGame";
import PlayAgain from "./PlayAgain";
import { N, STARTING_PLAYER_WON, STARTING_PLAYER } from "../constants";
function App() {
  function createBoard() {
    var temp_board = [];
    for (var i = 0; i < N; i++) {
      var temp_row = [];
      for (var j = 0; j < N; j++) {
        temp_row.push("-");
      }
      temp_board.push(temp_row);
    }
    return temp_board;
  }

  const [board, setboard] = useState(createBoard(STARTING_PLAYER_WON));

  const [playerTurn, setPlayerTurn] = useState(STARTING_PLAYER);

  const [playerWon, setPlayerWon] = useState(STARTING_PLAYER_WON);

  // Game start => playerTurn: O, playerWon: -
  // Game won by O => playerTurn: X, playerWon: X
  // Game drawn => playerTurn: -, playerWon: -

  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  useEffect(() => {
    checkBoard();
  });

  function handleBoardClick(x, y) {
    if (playerWon === STARTING_PLAYER_WON) {
      if (board[x][y] !== STARTING_PLAYER_WON) {
        return;
      }
      setboard((prevBoard) => {
        return prevBoard.map((row, row_idx) => {
          return row.map((col, col_idx) => {
            if (row_idx === x && col_idx === y) return playerTurn;
            else return col;
          });
        });
      });
      setPlayerTurn((prevChance) => (prevChance === "O" ? "X" : "O"));
    }
  }

  function checkBoard() {
    if (playerWon !== STARTING_PLAYER_WON) {
      return;
    }
    var row = new Array(N).fill(0);
    var col = new Array(N).fill(0);
    var left_diag = 0;
    var right_diag = 0;
    for (let i = 0; i < N; i++) {
      row[i] = 0;
      col[i] = 0;
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        row[i] += checkValue(i, 0, i, j);
        col[j] += checkValue(0, j, i, j);
        if (i === j) {
          left_diag += checkValue(0, 0, i, j);
        }
        if (j + i === N - 1) {
          right_diag += checkValue(0, N - 1, i, j);
        }
      }
    }
    if (
      playerWon === STARTING_PLAYER_WON &&
      (row.includes(N) ||
        col.includes(N) ||
        left_diag === N ||
        right_diag === N)
    ) {
      setPlayerWon(() => {
        const res = playerTurn === "O" ? "X" : "O";
        setScore((prevScore) => ({
          ...prevScore,
          [res]: prevScore[res] + 0.5,
        }));
        return res;
      });
      return;
    }
    var board_filled = true;
    board.forEach((row) => {
      if (board_filled) {
        row.forEach((col) => {
          if (col === "-") {
            board_filled = false;
            return;
          }
        });
      }
    });
    if (board_filled) {
      setPlayerTurn(STARTING_PLAYER_WON);
      setPlayerWon(STARTING_PLAYER_WON);
      return;
    }
  }

  function checkValue(x, y, i, j) {
    return board[i][j] === board[x][y] && board[i][j] !== STARTING_PLAYER_WON
      ? 1
      : 0;
  }

  function handlePlayAgainClick() {
    setboard(createBoard());
    setPlayerWon(STARTING_PLAYER_WON);
    setPlayerTurn(STARTING_PLAYER);
  }

  function handleNewGameClick() {
    setboard(createBoard());
    setPlayerWon(STARTING_PLAYER_WON);
    setPlayerTurn(STARTING_PLAYER);
    setScore({
      X: 0,
      O: 0,
    });
  }

  return (
    <div>
      <Header />
      <div>
        <div className="row player-message-board">
          <PlayerMessage playerTurn={playerTurn} playerWon={playerWon} />
        </div>
        <div className="row">
          <div className="col-md-4 new-game">
            <NewGame onClick={handleNewGameClick} />
          </div>
          <div className="col-md-4">
            <Board board={board} onClick={handleBoardClick} />
          </div>
          <div className="col-md-4 play-again">
            <PlayAgain onClick={handlePlayAgainClick} />
          </div>
        </div>
        <div className="row score-board">
          <Score score={score} playerTurn={playerTurn} playerWon={playerWon} />
        </div>
      </div>
    </div>
  );
}

export default App;
