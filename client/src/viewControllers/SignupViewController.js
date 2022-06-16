import React from 'react';
import SignupForm from '../views/SignupForm';


const bgImage = require('../assests/image15.gif');

function SignupViewController() {
  return (
    <div>
        <SignupForm image={bgImage} />
    </div>
  )
}

export default SignupViewController;