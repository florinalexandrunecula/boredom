import React, { Component } from 'react'
import Board from './board'
import "./game.css"

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        const winner = calculateWinner(squares)

        if (winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "0"
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            const desc = move ? "Go to #" + move : "Restart the Game"
            if (desc === "Restart the Game") {
                return (
                    <button className="ResetBTN" onClick={() => {this.jumpTo(move)}}>
                        {desc}
                    </button>
                )
            }
        })

        let status
        if (winner) {
            status = "Winner is " + winner 
        } else {
            status = "Next Player is " + (this.state.xIsNext ? "X" : "0")
        }

        return (
            <header className="App-header-tic">
                <h1>
                    The classic Tic-Tac-Toe
                </h1>
                <div className="Game">
                    <div className="Game-board">
                        <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
                    </div>
                </div>
                <div className="Game-info">
                    <h2>
                        {status}
                    </h2>
                    <p>
                        {moves}
                    </p>
                </div>
            </header>
        )
    }
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
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
        }
    }

    return null;
}