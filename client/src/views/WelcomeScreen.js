import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function WelcomeScreen(props) {

  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    callWelcomePage();
  }, []);

  const callWelcomePage = async () => {
    try{
      const res = await fetch('/api/welcome', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
      setLoginUser(data);
    }
    catch(err) {
      console.log(err);
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try{
      const res = await fetch('/api/logout', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // if(!res.status === 200){
      //   const error = new Error(res.error);
      //   throw error;
      // }
    }
    catch(err) {
      console.log(err);
      navigate("/");
    }
  };

  return (
    <div className='container-fluid welcome'>
      <div className='row'>
        <p className='btn btn-dark mb-4 logout-btn' onClick={handleLogout}>Logout</p>
        <h1 className='text-center'>{loginUser.name}</h1>
      </div>
      <div className='row'>
        <img src={props.image} />
      </div> 
    </div>
  )
}

export default WelcomeScreen;