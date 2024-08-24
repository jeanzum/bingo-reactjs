import React from 'react';
import PlayerCard from './PlayerCard';

import './BingoGame.css';
class BingoGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: ['Player 1'],
            generatedNumbers: [],
            currentNumber: null,
            topScore: 0,
            winnerName: '',
        };
    }

    generateNextNumber() {
        const { generatedNumbers } = this.state;
        if (generatedNumbers.length >= 75) {
            alert("All numbers have been called!");
            return;
        }

        let num;
        do {
            num = Math.floor(Math.random() * 75) + 1;
        } while (generatedNumbers.includes(num));

        this.setState({
            generatedNumbers: [...generatedNumbers, num],
            currentNumber: num
        });
    }

    handleWin(score, name) {
        const { topScore } = this.state;
        if (score > topScore) {
            this.setState({
                topScore: score,
                winnerName: name
            });
        }
    }

    render() {
        const { currentNumber, players, winnerName, topScore, generatedNumbers } = this.state;

        return (
            <div className='bingo-game'>
                <h1 className='game-title'>Tropical Bingo</h1>
                <div className='player-container'>
                    {players.map((player, index) => (
                        <PlayerCard
                            key={index}
                            name={player}
                            generateNumbers={generatedNumbers}
                            onWin={(score) => this.handleWin(score, player)}
                        />
                    ))}
                </div>
                <div className='controls'>
                    <button className='btn-animated' onClick={() => this.generateNextNumber()}>Nuevo numero</button>
                    {currentNumber && (
                        <div className='current-number'>{currentNumber}
                        </div> )}

                </div>
                {winnerName && (
                    <div className='top-winner'>
                        {winnerName} wins with a score of {topScore}!
                    </div>
                )}
            </div>
        )
    }
}

export default BingoGame;