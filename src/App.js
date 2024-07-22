import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import './App.css'; // Ensure this file contains the styles

const App = () => {
    const [totalPoints, setTotalPoints] = useState({ X: 0, O: 0 });

    const updatePoints = (points) => {
        setTotalPoints(prevPoints => ({
            X: prevPoints.X + points.X,
            O: prevPoints.O + points.O
        }));
    };

    const winner = totalPoints.X > totalPoints.O ? 'X' : totalPoints.X < totalPoints.O ? 'O' : 'Draw';

    return (
        <div className="App">
            <TicTacToe updatePoints={updatePoints} />
            
        </div>
    );
};

export default App;
