import React, { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(
    Array(4)
      .fill(null)
      .map(() => Array(16).fill(null))
  );
  const [isXNext, setIsXNext] = useState(true);
  const [points, setPoints] = useState({ X: 0, O: 0 });
  const [playerStarts, setPlayerStarts] = useState(true); // Player starts by default
  const [winner, setWinner] = useState(null);
  const [isTwoPlayer, setIsTwoPlayer] = useState(false); // Add state for two-player mode

  useEffect(() => {
    if (!isXNext && !winner && !isTwoPlayer) {
      const bestMove = findBestMove(board);
      if (bestMove !== null) {
        const newBoard = board.map((layer) => layer.slice());
        newBoard[bestMove.layer][bestMove.index] = "O";
        setBoard(newBoard);
        setIsXNext(true);
      }
    }
  }, [isXNext, board, winner, isTwoPlayer]);

  useEffect(() => {
    const newPoints = calculatePoints(board);
    setPoints(newPoints);
    checkForWinner(newPoints);
  }, [board]);

  const handleClick = (layer, index) => {
    if (board[layer][index] || winner) return;

    const newBoard = board.map((layer) => layer.slice());
    newBoard[layer][index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleStartClick = (startsFirst) => {
    setPlayerStarts(startsFirst);
    setIsXNext(startsFirst);
    setBoard(
      Array(4)
        .fill(null)
        .map(() => Array(16).fill(null))
    );
    setPoints({ X: 0, O: 0 });
    setWinner(null);
    setIsTwoPlayer(false); // Reset two-player mode
  };

  const handleTwoPlayerClick = () => {
    setBoard(
      Array(4)
        .fill(null)
        .map(() => Array(16).fill(null))
    );
    setPoints({ X: 0, O: 0 });
    setWinner(null);
    setIsTwoPlayer(true); // Enable two-player mode
    setIsXNext(true); // X always starts in two-player mode
  };

  const renderSquare = (layer, index) => {
    const value = board[layer][index];
    let className = "square";
    if (value === "X") className += " playerX";
    if (value === "O") className += " playerO";

    return (
      <div
        className={className}
        onClick={() => handleClick(layer, index)}
        key={index}
      >
        {value}
      </div>
    );
  };

  const renderLayer = (layer, layerIndex) => (
    <div className="layer" key={layerIndex}>
      {layer.map((_, index) => renderSquare(layerIndex, index))}
    </div>
  );

  const checkForWinner = (points) => {
    if (points.X > points.O) {
      setWinner("X");
    } else if (points.O > points.X) {
      setWinner("O");
    }
  };

  return (
    <div className="game">
      <div className="grid">
        {board.map((layer, index) => renderLayer(layer, index))}
      </div>
      <div className="info">
        Points - X: {points.X}, O: {points.O}
        {winner && ` | Winner: ${winner}`}
      </div>
      <div className="controls">
        <button onClick={() => handleStartClick(true)}>Player Starts</button>
        <button onClick={() => handleStartClick(false)}>Computer Starts</button>
        <button onClick={handleTwoPlayerClick}>Two Player Mode</button>
      </div>
    </div>
  );
};

const calculatePoints = (board) => {
  const lines = getLines();

  const points = { X: 0, O: 0 };

  for (let line of lines) {
    const [a, b, c, d] = line;

    const layers = [
      Math.floor(a / 16),
      Math.floor(b / 16),
      Math.floor(c / 16),
      Math.floor(d / 16),
    ];
    const indices = [a % 16, b % 16, c % 16, d % 16];

    if (
      board[layers[0]] &&
      board[layers[1]] &&
      board[layers[2]] &&
      board[layers[3]]
    ) {
      const values = [
        board[layers[0]][indices[0]],
        board[layers[1]][indices[1]],
        board[layers[2]][indices[2]],
        board[layers[3]][indices[3]],
      ];

      if (values.every((value) => value === "X")) points.X += 1;
      if (values.every((value) => value === "O")) points.O += 1;
    }
  }

  return points;
};

const evaluateBoard = (board) => {
  const points = calculatePoints(board);
  return points.O - points.X;
};

const findBestMove = (board) => {
  // Check for winning moves for 'O'
  const winningMove = findWinningMove(board, "O");
  if (winningMove) {
    return winningMove;
  }

  // Block every potential winning move for 'X'
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove) {
    return blockingMove;
  }

  // Evaluate all possible moves for 'O'
  let bestVal = -Infinity;
  let bestMoves = [];

  for (let layer = 0; layer < 4; layer++) {
    for (let i = 0; i < board[layer].length; i++) {
      if (board[layer][i] === null) {
        board[layer][i] = "O";
        let moveVal = minimax(board, 0, false);
        board[layer][i] = null;

        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMoves = [{ layer, index: i }];
        } else if (moveVal === bestVal) {
          bestMoves.push({ layer, index: i });
        }
      }
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
};

const findWinningMove = (board, player) => {
  const lines = getLines();

  for (let line of lines) {
    const [a, b, c, d] = line;
    const positions = [a, b, c, d].map((pos) => ({
      layer: Math.floor(pos / 16),
      index: pos % 16,
    }));

    const values = positions.map(({ layer, index }) => board[layer]?.[index]);

    if (
      values.filter((value) => value === player).length === 3 &&
      values.includes(null)
    ) {
      const emptyPosition = positions[values.indexOf(null)];
      return emptyPosition;
    }
  }

  return null;
};

const minimax = (board, depth, isMaximizing) => {
  const score = evaluateBoard(board);

  if (score === 1 || score === -1 || depth >= 2) {
    return score;
  }

  if (board.flat().every((cell) => cell !== null)) {
    return 0;
  }

  if (isMaximizing) {
    let bestVal = -Infinity;
    for (let layer = 0; layer < 4; layer++) {
      for (let i = 0; i < board[layer].length; i++) {
        if (board[layer][i] === null) {
          board[layer][i] = "O";
          bestVal = Math.max(bestVal, minimax(board, depth + 1, false));
          board[layer][i] = null;
        }
      }
    }
    return bestVal;
  } else {
    let bestVal = Infinity;
    for (let layer = 0; layer < 4; layer++) {
      for (let i = 0; i < board[layer].length; i++) {
        if (board[layer][i] === null) {
          board[layer][i] = "X";
          bestVal = Math.min(bestVal, minimax(board, depth + 1, true));
          board[layer][i] = null;
        }
      }
    }
    return bestVal;
  }
};

const getLines = () => {
  return [
    // Horizontal lines within each layer
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [32, 33, 34, 35],
    [36, 37, 38, 39],
    [40, 41, 42, 43],
    [44, 45, 46, 47],
    [48, 49, 50, 51],
    [52, 53, 54, 55],
    [56, 57, 58, 59],
    [60, 61, 62, 63],

    // Vertical lines within each layer
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [16, 20, 24, 28],
    [17, 21, 25, 29],
    [18, 22, 26, 30],
    [19, 23, 27, 31],
    [32, 36, 40, 44],
    [33, 37, 41, 45],
    [34, 38, 42, 46],
    [35, 39, 43, 47],
    [48, 52, 56, 60],
    [49, 53, 57, 61],
    [50, 54, 58, 62],
    [51, 55, 59, 63],

    // Diagonal lines within each layer
    [0, 5, 10, 15],
    [3, 6, 9, 12],
    [16, 21, 26, 31],
    [19, 22, 25, 28],
    [32, 37, 42, 47],
    [35, 38, 41, 44],
    [48, 53, 58, 63],
    [51, 54, 57, 60],

    // Vertical lines across layers
    [0, 16, 32, 48],
    [1, 17, 33, 49],
    [2, 18, 34, 50],
    [3, 19, 35, 51],
    [4, 20, 36, 52],
    [5, 21, 37, 53],
    [6, 22, 38, 54],
    [7, 23, 39, 55],
    [8, 24, 40, 56],
    [9, 25, 41, 57],
    [10, 26, 42, 58],
    [11, 27, 43, 59],
    [12, 28, 44, 60],
    [13, 29, 45, 61],
    [14, 30, 46, 62],
    [15, 31, 47, 63],

    // Diagonal lines across layers
    [0, 21, 42, 63],
    [3, 22, 41, 60],
    [12, 25, 38, 51],
    [15, 26, 37, 48],
    [0, 17, 34, 51],
    [3, 18, 33, 48],
    [12, 29, 46, 63],
    [15, 30, 45, 60],

    // 3D diagonal lines
    [0, 20, 40, 60],
    [3, 19, 35, 51],
    [12, 24, 36, 48],
    [15, 27, 39, 51],
    [0, 21, 42, 63],
    [1, 18, 35, 52],
    [2, 19, 36, 53],
    [3, 20, 37, 54],
    [4, 21, 38, 55],
    [5, 22, 39, 56],
    [6, 23, 40, 57],
    [7, 24, 41, 58],
    [8, 25, 42, 59],
    [9, 26, 43, 60],
    [10, 27, 44, 61],
    [11, 28, 45, 62],
    [12, 29, 46, 63],
    [13, 30, 47, 64],
    [14, 31, 48, 65],
    [15, 32, 49, 66],
  ];
};

export default TicTacToe;
