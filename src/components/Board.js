import Tile from "./Tile";
function Board({ board, onClick }) {
  return (
    <table className="board">
      {board.map((row, row_id) => (
        <thead key={row_id}>
          <tr key={row_id}>
            {row.map((col, col_id) => (
              <td key={col_id} onClick={() => onClick(row_id, col_id)}>
                <Tile row={row_id} col={col_id} key={col_id} value={col} />
              </td>
            ))}
          </tr>
        </thead>
      ))}
    </table>
  );
}
export default Board;
