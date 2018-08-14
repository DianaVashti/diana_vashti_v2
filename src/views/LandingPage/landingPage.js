import React, {Component}  from 'react';
import Cell from './Cell';

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    height: 25,
    width: 250
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    height: 250,
    width: 250
  }
}

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
      xsize: 10,
      ysize: 10,
      dead: 0,
      alive: 1,
      setup: 'flower',
      firstLoad: true,
      markedForChange: []
    }

    this.onPageLoad = this.onPageLoad.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.neighborCount = this.neighborCount.bind(this);
    this.makeNewBoard = this.makeNewBoard.bind(this);
  }

  onPageLoad(){
    if(this.state.firstLoad){
      this.setState({
        board: (new Array(this.state.xsize))
      })
      for(var x = 0; x < this.state.xsize; ++x)
      {
        this.state.board[x] = new Array(this.state.ysize);
        for(var y = 0; y < this.state.ysize; ++y)
          this.state.board[x][y] = 0;
      }

      if(this.state.setup === 'blinker' && this.state.firstLoad === true){
        let myBoard = this.state.board;
        myBoard[1][0] = this.state.alive;
        myBoard[1][1] = this.state.alive;
        myBoard[1][2] = this.state.alive;
        this.setState({board: myBoard})
      } else if(this.state.setup === 'flower' && this.state.firstLoad === true){
        let myBoard = this.state.board;
        myBoard[2][0] = this.state.alive;
        myBoard[2][1] = this.state.alive;
        myBoard[2][2] = this.state.alive;
        myBoard[1][2] = this.state.alive;
        myBoard[0][1] = this.state.alive;
        this.setState({board: myBoard})
      }
    }

    this.setState({firstLoad: false})
  }

  componentWillMount() {
    this.state.firstLoad ? this.onPageLoad() : this.renderBoard();
  }

  renderRow(row) {
    let n = 0;

    return row.map(item => {
      n++;
      return(
        <Cell alive={ item } key={ n }/>
      )
    })
  }

  renderBoard(){
    let rowNum = 0
    return this.state.board.map(row => {
      rowNum++
      return (
        <div className='row' key={rowNum} style={styles.row}>
          {this.renderRow(row)}
        </div>
      )
    })
  }

  handleOnClick(){
    console.log('click')
    return this.updateBoard(this.state.board)
  }

  updateBoard(Board) {
    this.setState({markedForChange: []});

    let markedForChange = this.state.markedForChange;

    for(var i = 0; i < this.state.xsize; i++) {
    	for(var j = 0; j < this.state.ysize; j++) {
  			let n = this.neighborCount(Board,j,i);
  			if(n == 3){
          markedForChange.push(['revive', i, j])
        } else if((n<2)||(n>3)) {
          markedForChange.push(['kill', i, j])
        }
  		}
  	}
    this.setState(markedForChange: markedForChange);
    return this.makeNewBoard(Board);
  }

  makeNewBoard(oldBoard) {
    let newBoard = oldBoard;
    let markedForChange = this.state.markedForChange;

    for(let i=0; i<markedForChange.length; i++){
      if(markedForChange[i][0] === 'revive'){
        newBoard[markedForChange[i][1]][markedForChange[i][2]] = 1;
      } else if(markedForChange[i][0] === 'kill'){
        newBoard[markedForChange[i][1]][markedForChange[i][2]] = 0;
      }
      this.setState({board: newBoard});
    }
  }

  neighborCount(Board, x, y) {
  	let z = 0;
    let xLeft = x-1;
    let xRight = x+1;
    let yUp = y-1;
    let yDown = y+1;

    if (xLeft < 0){
      xLeft = this.state.xsize - 1;
    }
    if( xRight >= this.state.xsize){
      xRight = 0;
    }
    if(yUp < 0){
      yUp = this.state.ysize - 1;
    }
    if(yDown >= this.state.ysize){
      yDown = 0;
    }

    if( Board[yUp][xLeft] === 1 ){
      z = z+1;
    }
    if(Board[yUp][x] === 1){
      z = z+1;
    }
    if(Board[yUp][xRight] === 1){
      z = z+1;
    }
    if(Board[y][xLeft] === 1){
      z = z+1;
    }
    if(Board[y][xRight] === 1){
      z = z+1;
    }
    if(Board[yDown][xLeft] === 1){
      z = z+1;
    }
    if(Board[yDown][x] === 1){
      z = z+1;
    }
    if(Board[yDown][xRight] === 1){
      z = z+1;
    }
  	return z;
  }

  render() {
    return (
      <div>
        <div className='column' style={styles.column}>
          {this.renderBoard()}
        </div>
        <button onClick={this.handleOnClick} style={{marginTop: 50}}>
          CLick Me
        </button>
      </div>
    )
  }
}
