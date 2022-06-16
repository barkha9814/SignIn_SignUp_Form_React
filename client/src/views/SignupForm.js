import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdDarkMode, MdEmail } from 'react-icons/md';
import { validName, validEmail, validPassword } from '../FormValidation/Regex';


function SignupForm(props) {

  const toastOptions = {
    position : "bottom-right",
    autoClose : 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // console.log(formValues);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(validate()){
      console.log("call the api");
      createUser(e);
      // const { name, email, password } = formValues;
      // localStorage.setItem("skype-chat", JSON.stringify({name, email, password}));
      // navigate("/signup/selectAvatar");
    }
    else{
        console.log("Couldn't call the API");
        console.log(formValues);
    }
  };


  const validate = () => {
    const { password, cpassword, name, email } = formValues;

    if (name === "") {
        toast.error("Please Fill your name",toastOptions);
        return false;
    }else if(!validName.test(name)){
        toast.error("Name should contain letter and spaces only and 1st letter must capital!",toastOptions);
        return false;
    }

    else if (email === "") {
        toast.error("Please Fill your email",toastOptions);
        return false;
    }
    else if (!validEmail.test(email)) {
        toast.error("Please insert valid email",toastOptions);
        return false;
    }

    else if (password === "") {
        toast.error("Please Fill the password",toastOptions);
        return false;
    }
    else if (!validPassword.test(password)) {
        toast.error("Password should contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and have a length of at least of 8!",toastOptions);
        return false;
    }
    
    else if (cpassword === "") {
        toast.error("Please confirm your password",toastOptions);
        return false;
    }  
    else if (password !== cpassword) {
        toast.error("Passwords does not match!",toastOptions);
        return false;
    }
    return true;
  };

  const createUser = async (e) => {
    e.preventDefault();
    console.log("APIIIIIIIIIII");
    const { name, email, password, cpassword } = formValues;

    const res = await fetch("/api/signup", {
        method: "POST",
        headers: { 
                "Content-Type": "application/json" 
            },
        body: JSON.stringify({ name, email, password, cpassword })
    });

    if(res.status === 201){
        // console.log(res.status);
        const data = await res.json();
        console.log(data);
        // toast.success("Registration Successful");
        // localStorage.clear();
        navigate("/",{state: 'success'});
    }
    else{
        toast.error("Registration Unsuccessful",toastOptions);
    }
  };

  return (
  <>
    <div className='form-container container-fluid'>
      <div className="row">
        <form method='POST' noValidate onSubmit={(event) => handleSubmit(event)}>
          <h2 className='mb-3 text-center'>Create Account</h2>
          <p className='mb-5 text-center'>Get started by creating your new account</p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><FaUserAlt /></span>
            <input type="text" className="form-control" name="name" id="name" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                  value={formValues.name}
                  onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
            <input type="email" className="form-control" name="email" id="email" placeholder="email" aria-label="email" aria-describedby="basic-addon1" 
                  value={formValues.email}
                  onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
            <input type="password" className="form-control" name="password" id="password" placeholder="password" aria-label="password" aria-describedby="basic-addon1" 
                    value={formValues.password}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className="input-group mb-5">
            <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
            <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="confirm password" aria-label="confirmPassword" aria-describedby="basic-addon1" 
                    value={formValues.cpassword}
                    onChange={(e) => handleChange(e)}/>
          </div>
          <div className='text-center  mb-3'>
              <button type="submit" className="text-white btn formBtn w-100"><span>Join Us </span></button>
          </div>
          <p className='mb-4 text-center'>already have an account? <NavLink to="/" className="registerLink">Login</NavLink></p>
        </form>
      </div>
    </div>
    <ToastContainer />
  </>
  )
}

export default SignupForm;








{/* <div className={`container-fluid`}>
      <div className='center-div'>
        <div className='row bg-dark'>
            <div className='col-lg-12 col-md-12 col-12 bg-dark left-col'>
              <img src={props.image} />
              <form method='POST' noValidate onSubmit={(event) => handleSubmit(event)}>
                    <h2 className='mb-3 text-center'>Create Account</h2>
                    <p className='mb-4 text-center'>Get started by creating your new account</p>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><FaUserAlt /></span>
                      <input type="text" className="form-control" name="name" id="name" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                            value={formValues.name}
                            onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
                      <input type="email" className="form-control" name="email" id="email" placeholder="email" aria-label="email" aria-describedby="basic-addon1" 
                            value={formValues.email}
                            onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
                      <input type="password" className="form-control" name="password" id="password" placeholder="password" aria-label="password" aria-describedby="basic-addon1" 
                             value={formValues.password}
                             onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
                      <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="confirm password" aria-label="confirmPassword" aria-describedby="basic-addon1" 
                              value={formValues.cpassword}
                              onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className='text-center  mb-3'>
                        <button type="submit" className="text-white btn formBtn w-75">Join Us</button>
                    </div>
                    <p className='mb-4 text-center'>already have an account? <NavLink to="/" className="registerLink">Login</NavLink></p>
                </form>
            </div>
        </div>
      </div>
    </div> */}