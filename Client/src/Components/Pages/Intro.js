import React from 'react';
import wall from '../../Images/blur1.png';
import wall1 from '../../Images/blur2.png';
import '../../Style/IntroPage.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ParallaxFlippingCards = () => {

  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleHover = () => {
    setIsHovered(!isHovered);
  };
    return (
      <div className="wrapper">
        <h1>Welcome to your company event management platform!</h1>
        <h2>To see the events you will need to log with your company credentials.<br/>If you don't have an account, please go to the register<br/> page and use your company credentials.</h2>
        <div className="cols">
        <div className={`col ${isHovered ? 'hover' : ''}`} onTouchStart={handleHover}>
          <div className="container1">
            <div className="front" style={{ backgroundImage: `url(${wall})` }}>
              <div className="inner">
                <p>Login</p>
                <span>Hover to access the page</span>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <Link to="/login">
                  <Button variant="contained" size="medium" color="inherit">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${isHovered ? 'hover' : ''}`} onTouchStart={handleHover}>
          <div className="container1">
            <div className="front" style={{ backgroundImage: `url(${wall1})` }}>
              <div className="inner">
                <p>Register</p>
                <span>Hover to access the page</span>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <Link to="/register">
                  <Button variant="contained" size="medium" color="inherit">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };
  
  
export default ParallaxFlippingCards;