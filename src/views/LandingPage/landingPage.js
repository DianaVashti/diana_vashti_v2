import React from 'react';
import Grid from './Grid';

const style = {
  display: 'flex',
  flexDirection: 'row',
}

const LandingPage = () => {
  return (
    <div style={style}>
      <Grid gridSize={16} setup={'flower'} />
      <Grid gridSize={10} setup={'glider'}/>
      <Grid gridSize={10} setup={'blinker'} />
    </div>
  )
}

export default LandingPage;
