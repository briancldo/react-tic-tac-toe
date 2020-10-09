import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.handleClick(i)} />
      );
    }    
  
    render() {  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  function getNewGameState() {
    return {
      history: [{
        squares: Array(9).fill(null),
      }],
      x: Math.round(Math.random()) === 0,
      winner: null,
    };
  };
  const MOVE_LIMIT = 10;
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = getNewGameState();
    }

    getTurn() {
      return this.state.x ? 'X' : 'O';
    }

    getStatus() {
      if(this.state.history.length === MOVE_LIMIT) return 'Draw!';

      return this.state.winner
        ? `Winner: ${this.state.winner}`
        : `Player to move: ${this.getTurn()}`;
    }

    handleClick(i) {
      if (!this.state.winner && !this.state.history[0].squares[i]) {
        let newState = {};

        const squares = [ ...this.state.history[0].squares ];
        squares[i] = this.getTurn();
        newState = { history: [ { squares }, ...this.state.history ], x: !this.state.x };

        const winner = calculateWinner(squares);
        if (winner) newState = { ...newState, winner };
        this.setState(newState);
      }
    }

    undoMove() {
      if (this.state.history.length > 1) {
        this.setState(currentState => {
          return {
            history: currentState.history.slice(1),
            winner: null,
            x: !currentState.x,
          };
        });
      }
    }

    resetGame() {
      this.setState(getNewGameState());
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={this.state.history[0].squares} x={this.state.x} winner={this.state.winner} handleClick={this.handleClick.bind(this)} />
          </div>
          <div className="game-info">
            <div>{this.getStatus()}</div>
            <br />
            <div>Move {this.state.history.length}</div>
            <button onClick={() => this.undoMove()}>Undo</button>
            <br />
            <button onClick={() => this.resetGame()}>New Game</button>
          </div>
        </div>
      );
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
      [2, 4, 6],
    ];
    
    for (const line of lines) {
      const [ a, b, c ] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  