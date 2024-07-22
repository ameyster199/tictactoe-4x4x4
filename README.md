# TicTacToe (4x4x4)

## Introduction

TicTacToe (4x4x4) is a React-based implementation of a three-dimensional Tic-Tac-Toe game played on a 4x4x4 grid. The game can be played in either single-player mode against an AI or in a two-player mode. The goal of the game is to get four marks in a row either horizontally, vertically, or diagonally across any layer or across multiple layers.

## Features

- **Single-Player Mode**: Play against an AI that makes calculated moves.
- **Two-Player Mode**: Play against another human player on the same device.
- **Dynamic Point Calculation**: Points are calculated dynamically based on the current board state.
- **Player Choice**: Choose whether the player or the AI starts the game.
- **Interactive UI**: Clickable grid cells to place marks.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tictactoe-4x4x4.git
   cd tictactoe-4x4x4
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then, run the following command:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```
   This will start the application on `http://localhost:3000`.

## How to Play

1. **Start the Game**:
   - Choose whether the player or the AI starts by clicking the respective button: "Player Starts" or "Computer Starts".
   - To play in two-player mode, click the "Two Player Mode" button.

2. **Gameplay**:
   - Click on any cell in the 4x4x4 grid to place your mark (X for player 1, O for player 2 or AI).
   - The game will automatically switch turns between players or between the player and the AI.

3. **Winning the Game**:
   - The game automatically calculates the points for each player. The first player to get four marks in a row (horizontally, vertically, or diagonally) wins the game.
   - The winner is displayed in the information panel.

## Game Logic

### AI Mechanics

The AI utilizes a minimax algorithm to determine the best move. It evaluates the board and makes a move that maximizes its chances of winning while minimizing the player's chances.

### Point Calculation

Points are calculated dynamically based on the current board state. Each completed line of four marks (either X or O) across any row, column, or diagonal adds points to the respective player.

### Winning Conditions

The game checks for winning conditions by evaluating all possible lines (horizontal, vertical, and diagonal) across all layers and between layers.

## File Structure

- **src**: Contains the main game logic and components.
  - `TicTacToe.js`: Main game component.
  - `index.js`: Entry point of the React application.

## Dependencies

- React: JavaScript library for building user interfaces.
- useState, useEffect: React hooks for managing state and side effects.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the React community for providing comprehensive documentation and resources.
- Special thanks to all contributors for their valuable inputs.



