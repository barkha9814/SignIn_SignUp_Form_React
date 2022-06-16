import React from 'react';
import LoginForm from '../views/LoginForm';

const bgImage = require('../assests/image15.gif');

function LoginViewController() {
  return (
    <div>
        <LoginForm image={bgImage} />
    </div>
  )
}

export default LoginViewController;