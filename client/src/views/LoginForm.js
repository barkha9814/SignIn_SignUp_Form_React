import React,{ useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { validName, validEmail, validPassword } from '../FormValidation/Regex';




function LoginForm(props) {

  const toastOptions = {
    position : "bottom-right",
    autoClose : 8000,
    pauseOnHover: true,
    draggable: true,
    theme : "dark"
  };

  const navigate = useNavigate();
  let locationState = useLocation();
  useEffect(() => {
    if(locationState.state === 'success'){
      toast.success("Registration Successful");
      // locationState = null;
    }
  },[]);
  
  
  // console.log(locationState);

  const [formValues, setFormValues] = useState({ email: "", password: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(validate()){
        console.log("Callign API");
        // console.log(formValues);
        userLogin(e);
    }
    else{
        console.log("Couldn't call the API");
    }
  };

  const validate = () => {
      const { password, email } = formValues;

      if (email === "") {
          toast.error("Please Fill your email",toastOptions);
          return false;
      }
      else if (!validEmail.test(email)) {
          toast.error("This is not a valid email format!",toastOptions);
          return false;
      }

      else if (password === "") {
          toast.error("Please Fill the password",toastOptions);
          return false;
      }
      else if (!validPassword.test(password)) {
          toast.error("This is not a valid password format!",toastOptions);
          return false;
      }
      return true;
  };

  const userLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formValues;
    
    const res = await fetch("/api/signin", {
        method: "POST",
        headers: { 
                "Content-Type": "application/json" 
            },
        body: JSON.stringify({email, password })
    });

    if(res.status === 400){
        toast.error("Login Unsuccessful",toastOptions);
    }
    else{
        // console.log(res.status);
        const data = await res.json();
        console.log(data);
        // toast.success("Login Successful");
        // localStorage.setItem("skype-chat", JSON.stringify(data));
        navigate("/welcome",{state: 'Loginsuccess'});
    }
};

  return (
  <>
    <div className='form-container container-fluid'>
      <div className="row">
        <form method='POST' noValidate className='form' onSubmit={(event) => handleSubmit(event)}>
          <h2 className='mb-3 text-center'>Welcome Back!</h2>
          <p className='mb-5 text-center'>Login to your account and get started</p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
            <input type="email" className="form-control" name="email" id="email" placeholder="email" aria-label="email" aria-describedby="basic-addon1" 
                    value={formValues.email}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-5">
            <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
            <input type="password" className="form-control" name="password" id="password" placeholder="password" aria-label="password" aria-describedby="basic-addon1" 
                    value={formValues.password}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-3">
            <input className="form-check-input remember-check" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label remember-check-label" htmlFor="flexCheckDefault">Remember me</label>
            <p className='forgot-password'><NavLink to="#" className="registerLink">Forgot Password</NavLink></p>
          </div>
          
          <div className='text-center mb-3'>
              <button type="submit" className="text-white btn formBtn w-100"><span>Login </span></button>
          </div>
          <p className='mb-2 text-center'>don't have an account? <NavLink to="/signup" className="registerLink">Register</NavLink></p>
        </form>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default LoginForm;