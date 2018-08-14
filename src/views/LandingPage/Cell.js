import React from 'react';

const Cell = ({ alive }) => {
  const style = {
    height: 25,
    width: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black'
  }

  if ( alive === 1 ) {
    return (
      <p style={style}>o</p>
    )
  } else if (alive === 0){
    return (
      <p style={style}>_</p>
    )
  }
}

export default Cell;
