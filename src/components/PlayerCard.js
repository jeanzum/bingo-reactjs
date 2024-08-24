/* eslint-disable no-unused-vars */
import React from 'react';
import './PlayerCard.css';
class PlayerCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            card: this.generateCard(),
            score: 0,
            isWinner: false,
        };
    }

    generateCard(){
        const columns = {
            B: this.generateNumber(1, 15),
            I: this.generateNumber(16, 30),
            N: this.generateNumber(31, 45),
            G: this.generateNumber(46, 60),
            O: this.generateNumber(61, 75) 
        };

        return columns;
    }

    generateNumber(min, max){
        const numbers = [];
        while(numbers.length < 5){
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            if(!numbers.includes(number)){
                numbers.push(number);
            }
        }
        return numbers;
    }

    componentDidUpdate(prevProps) {

        if(prevProps.generateNumbers !== this.props.generateNumbers){
            const lastNumber = this.props.generateNumbers.slice(-1)[0];
            console.log(lastNumber)
            this.markNumber(lastNumber);
        }
    }

    markNumber(num) {
        console.log(num)
        const { card } = this.state;
        let newScore = this.state.score;
    
        console.log(`Marking number: ${num}`);
    
        Object.keys(card).forEach((column) => {
            const index = card[column].indexOf(num);
            if (index !== -1) {
                console.log(`Number found in column ${column} at index ${index}`);
                card[column][index] = 'X';
                newScore += 10;
            }
        });
    
        this.setState({
            card: card,
            score: newScore
        }, this.checkWinner);
    }
    
    checkWinner() {
        const { card } = this.state;
        let isWinner = false;
    
        for (let i = 0; i < 5; i++) {
            if (Object.keys(card).every((col) => card[col][i] === 'X')) {
                isWinner = true;
                break;
            }
        }
    
        for (let col in card) {
            if (card[col].every((num) => num === 'X')) {
                isWinner = true;
                break;
            }
        }
    
        if (
            card.B[0] === 'X' &&
            card.I[1] === 'X' &&
            card.N[2] === 'X' &&
            card.G[3] === 'X' &&
            card.O[4] === 'X'
        ) {
            isWinner = true;
        }
    
        if (
            card.B[4] === 'X' &&
            card.I[3] === 'X' &&
            card.N[2] === 'X' &&
            card.G[1] === 'X' &&
            card.O[0] === 'X'
        ) {
            isWinner = true;
        }
    
        if (isWinner) {
            console.log("We have a winner!");
            // Additional logic for handling a win can be added here
        }
    }

    render(){
        const { card, score, isWinner } = this.state;
        return (
            <div className={`player-card ${isWinner ? 'winner' : ''}`}>
                <h3>Jugador: {this.props.name}</h3>
                <div className="score">Puntaje: {score}</div>
                    <div className="bingo-card">
                    {Object.keys(card).map((column) => (
                        <div key={column} className="bingo-column">
                            <div className="bingo-header">{column}</div>
                            {card[column].map((num, index) => (
                                <div key={index} className={`bingo-cell ${num === "X" ? 'marked' : ''}`}>{num}</div>
                            ))}
                        </div>
                    ))}
                </div>
                {isWinner && <div className='winner-message'>Bingo! We have a winner!</div>}
            </div>
       
        );
    }
}

export default PlayerCard;