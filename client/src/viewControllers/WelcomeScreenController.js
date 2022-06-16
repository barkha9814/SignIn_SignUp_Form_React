import React from 'react';
import WelcomeScreen from '../views/WelcomeScreen';


const bgImage = require('../assests/hello5.gif');


function WelcomeScreenController() {
  return (
    <div>
        <WelcomeScreen image={bgImage} />
    </div>
  )
}

export default WelcomeScreenController;