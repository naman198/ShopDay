import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// @desc  Auth Token & get token
// @oute / api/users/login
// access public

const authUser = asyncHandler( async (req, res)=>{
    const  {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});



// @desc  Register a new user
// @oute / api/users/
// access public

const registerUser = asyncHandler( async (req, res)=>{
    const  {name, email, password} = req.body;

    if(name === undefined || email === undefined || password === undefined)
    {
        res.status(400);
        throw new Error('undefined')
    }
    
    const userExists = await User.findOne({email});
    
    if(userExists)
    {
        res.status(400);
        throw new Error('user exist');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user !== null)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('invalid user data');
    }
});



// @desc  get
// @oute / api/users/profile
// access private

const getUserProfile = asyncHandler( async (req, res)=> 
{
    const user = await User.findById(req.user._id);

    if(user)
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error('user not found')
    }
});

export {authUser, getUserProfile, registerUser};