import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

// AuthForm.js
import React, { useContext, useRef } from 'react';
import AuthContext from './AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // If the login is successful, store the token in the context
        if (res.ok) {
          res.json().then((data) => {
            authCtx.login(data.idToken);
          });
        } else {
          console.log('hello');
        }
      });
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          // Handle successful signup
        } else {
          return res.json().then(data => {
            const errorMessage = 'Authentication failed';
            alert(errorMessage);
          });
        }
      });
    }
  };
  
     

  const logoutHandler = () => {
    // Clear the token when the user logs out
    authCtx.logout();
  };

  return (
    <section className={classes.auth}>
      {authCtx.token && (
        <div className={classes.actions}>
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {/* ... (same as your existing code) */}
      </form>
    </section>
  );
};

export default AuthForm;
