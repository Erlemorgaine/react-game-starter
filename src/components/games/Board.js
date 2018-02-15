import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import { updateGame } from '../../actions/game/update'
import './Board.css'

function Square(props) {
    return(
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
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

class Board extends PureComponent {

  setGame(i) {
    const tempSquares = this.props.game.squares.slice()
    let gameTurn = this.props.game.turn

    if (calculateWinner(tempSquares) || tempSquares[i] || !this.props.hasTurn) {
      return
    }

    if (this.props.hasTurn === true) {
      gameTurn = 1
    } else {
      gameTurn = 0
    }

    console.log(this.props.hasTurn)

    tempSquares[i] = this.props.game.turn === 0 ? this.props.game.symbol[0] : this.props.game.symbol[1]

    let newState = {
      _id: this.props.game._id,
      userId: this.props.game.userId,
      players: this.props.game.players,
      squares: tempSquares,
      turn: gameTurn
    }
    this.props.updateGame(newState)
  }

  renderSquare(i) {
    return(
      <Square
        value={this.props.game.squares[i]}
        onClick={() => this.setGame(i)}
      />
    )
  }

  render() {
    console.log(this.props.game.turn)
    const winner = calculateWinner(this.props.game.squares)
    let status = 'Winner: ';
    if (winner === 'X') {
      status += this.props.game.players[0].name
    } else if (winner === 'O') {
      status += this.props.game.players[1].name
    } else {
      status = 'Next player: ' + (this.props.game.turn === 0 ? this.props.game.players[0].name : this.props.game.players[1].name)
    }
    return (
      <div>
        <div className="status">{status}</div>
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
    )
  }
}

const mapStateToProps = ({ singleGame }) => ({
  singleGame
})

export default connect(mapStateToProps, {
  updateGame,
  subscribeToWebsocket,
})(Board)
