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

// @desc  get all users
// @oute / api/users/
// access private/Admin

const getUsers = asyncHandler( async (req, res)=> 
{
    const users = await User.find({});
    res.json(users);

});

// @desc  Delete a user
// @oute  /api/users/:id
// access private/Admin

const deleteUser = asyncHandler( async (req, res)=> 
{
    const user = await User.findById(req.params.id);

    console.log(req.params.id);
    
    if(user)
    {
        await user.remove()
        res.json({message: 'User Removed'})
    }
    else
    {
        res.status(404);
        throw new Error('User Not found')
    }

});

// @desc  update
// @oute  PUT /api/users/profile
// access private

const updateUserProfile = asyncHandler( async (req, res)=> 
{
    const user = await User.findById(req.user._id);

    if(user)
    {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updateduser = await user.save();


        res.json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin,
            token : generateToken(updateduser._id)
        })
    }
    else{
        res.status(401);
        throw new Error('user not found')
    }
});


// @desc  get api user id
// @oute / api/users/
// access private/Admin

const getUsersByID = asyncHandler( async (req, res)=> 
{
    const user = await User.findById(req.params.id).select('-password');
    if(user)
        res.json(user);
    else{
        res.status(401);
        throw new Error('user not found')
    }
});



// @desc  update user
// @oute  PUT /api/users/:id
// access private/admin

const updateUser = asyncHandler( async (req, res)=> 
{
    const user = await User.findById(req.params.id);

    if(user)
    {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        
        const updateduser = await user.save();

        res.json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin, 
        })
    }
    else{
        res.status(401);
        throw new Error('user not found')
    }
});


export {authUser, getUserProfile, updateUser, registerUser, getUsersByID ,updateUserProfile, getUsers, deleteUser};