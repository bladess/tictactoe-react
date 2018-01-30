import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Reset(props){

  return(
    <button onClick={props.onClick}>Reset the game</button>

  );
}
function Square(props) {
  return (
    <button className={"square "+ 
    (props.value !== null ? ('clicked '+ (props.value === 'X' ? 'caseX' : 'caseO')) :'unclicked' )} 
    onClick={props.onClick}>
    {props.value}
    </button>
  );
}



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      nbCoup : 0, 
      pointX : 0,
      pointO : 0,
      nul:0,
    };
  }
  reset(){
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      nbCoup : 0,
    });
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i] ) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let nbCoups = this.state.nbCoup;
    nbCoups++;
    this.setState({ 
      squares: squares, 
      xIsNext: !this.state.xIsNext,
      nbCoup: nbCoups,
    });
    let winner  = calculateWinner(squares);
    if(winner){
      if(winner === 'X'){
        let score = this.state.pointX;
        score++;
        this.setState(
          {
            pointX:score,
          }
        )
      }
      else{
        let score = this.state.pointO;
        score++;
        this.setState(
          {
            pointO:score,
          }
        )
      }
      this.reset();
    }
    else if(nbCoups === 9){
        let score = this.state.nul;
        score++;
        this.setState(
          {
            nul:score,
          }
        )
        this.reset();
    }
  }
  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }
  renderReset(){
    return <Reset
    onClick={() => this.resetScore()}
    />;
  }
  resetScore(){
    this.reset();
    this.setState({
      pointX:0,
      pointO:0,
      nul:0,
    })
  }
  render() {
    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    
    return (
      <div>
        <div className="status">{status}</div>
        <div>
            <ul>
              <li>
                Score X: {this.state.pointX}
              </li>
              <li>
                Score O:{this.state.pointO}
              </li>
              <li>
                Nul : {this.state.nul}
              </li>
            </ul>
        </div>
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
        <div>
          {this.renderReset()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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