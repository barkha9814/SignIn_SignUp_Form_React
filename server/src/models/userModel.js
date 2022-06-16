const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userModel.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
    this.cpassword = await bcrypt.hash(this.cpassword,salt);
});

userModel.methods.generateAuthToken = async function () {
    try{
        let newtoken = jwt.sign({ _id: this._id }, `${process.env.SECRET_KEY}`);
        this.tokens = this.tokens.concat({token: newtoken});
        await this.save();
        return newtoken;
    }
    catch(err){
        console.log(err);
    }
};

const User = mongoose.model('User',userModel);

module.exports = User;