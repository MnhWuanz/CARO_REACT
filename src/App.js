import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};
export default function Borad() {
  const [xIsNext, setXIsNext] = useState(true);
  const [square, setSquares] = useState(Array(9).fill(null));
  const isFull = square.every((square) => square != null);
  const winner = calculateWinner(square);
  var status;
  if (winner) status = "Winner: " + winner;
  else if (isFull) status = "It's a draw!";
  else status = "Next player: " + (xIsNext ? "X" : "O");
  const handelClick = (i) => {
    if (square[i] || calculateWinner(square)) return;
    const nextSquare = square.slice();
    xIsNext ? (nextSquare[i] = "X") : (nextSquare[i] = "O");
    setSquares(nextSquare);
    setXIsNext(!xIsNext);
  };
  if (isFull && !winner) {
    setTimeout(() => {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }, 1000);
  }
  if (winner) {
    setTimeout(() => {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
    }, 1000);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handelClick(0)} />
        <Square value={square[1]} onSquareClick={() => handelClick(1)} />
        <Square value={square[2]} onSquareClick={() => handelClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handelClick(3)} />
        <Square value={square[4]} onSquareClick={() => handelClick(4)} />
        <Square value={square[5]} onSquareClick={() => handelClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handelClick(6)} />
        <Square value={square[7]} onSquareClick={() => handelClick(7)} />
        <Square value={square[8]} onSquareClick={() => handelClick(8)} />
      </div>
    </>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
