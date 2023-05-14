import React from 'react';
import wall from '../../Images/wal1.png';
import Card from '../Organisms/IntroCard'

const Intro = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${wall})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <Card />
    </div>
  );
};

export default Intro;
