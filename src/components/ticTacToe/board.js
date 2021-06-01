import React, { Component } from 'react'
import Square from './square'
import "./board.css"

export default class Board extends Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        return (
            <div className="PageWrapper-Tic">
                <div className="Row-Tic">
                        <div className="Column-Tic">
                            {this.renderSquare(0)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(1)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(2)}
                        </div>
                </div>
                <div className="Row-Tic">
                        <div className="Column-Tic">
                            {this.renderSquare(3)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(4)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(5)}
                        </div>
                </div>
                <div className="Row-Tic">
                        <div className="Column-Tic">
                            {this.renderSquare(6)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(7)}
                        </div>
                        <div className="Column-Tic">
                            {this.renderSquare(8)}
                        </div>
                </div>
            </div>
            

        )
    }
}