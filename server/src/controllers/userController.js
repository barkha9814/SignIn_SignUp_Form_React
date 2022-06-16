const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const registration = async (req, res) => {
    const { name, email, password, cpassword } =req.body;

    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error: "Please fill all the fields"});
    }

    try{
        const userExist = await User.findOne({ email: email });
        
        if(userExist){
            return res.status(422).json({ error: "Email already exists"});
        }
        else if(password != cpassword){
            return res.status(422).json({ error: "Passwords don't match"});
        }
        else{
            const newUser =  new User({ name, email, password, cpassword });
            const userRegistered = await newUser.save();
            if(userRegistered){
                res.status(201).json({ message: `User Registered Successfully` });
            }
        } 
    }
    catch(err){
        console.log(err);
    }
};







const login = async (req, res) => {
    try{
        const { email, password } =req.body;

        if(!email || !password){
            return res.status(400).json({error: "Please fill the fields"});
        }

        const userLogin = await User.findOne({ email: email });

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("formToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                res.status(400).json({ message: "Login Unsuccessful, Invalid Credentials"});
            }
            else{
                res.json({ message: "Login Successful"});
            }
        }
        else{
            res.status(400).json({ message: "Login Unsuccessful,  Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
};

module.exports = { registration, login };