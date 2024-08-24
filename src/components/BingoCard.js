import React from 'react';
import './BingoCard.css';
class BingoCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            card: this.generateCard()
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


    render(){
        const { card } = this.state;
        return (
           <div className="bingo-card">
                {Object.keys(card).map((column) => (
                    <div key={column} className="bingo-column">
                        <div className="bingo-header">{column}</div>
                        {card[column].map((number, index) => (
                           <div key={index} className='bingo-cell'>{number}</div>
                        ))}
                    </div>
                ))}
           </div>
        );
    }
}

export default BingoCard;