const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//CREATE

exports.createUser= async (req, res) => {
    try {
        //check existing email
        const { name, email, password, phone } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({
                message: 'Email already exists',
            })
        }
        //check existing phone number
        const existingPhoneNumber = await User.findOne({ phone });
        if (existingPhoneNumber) {
            return res.status(400).send({
                message: 'Phone Number already exists',
            })
        }
        //hash password
        const passwordhash = await bcrypt.hash(password, 10);


        const users = await User.create({
            name,
            email,
            password : passwordhash,
            phone,
            role
        });
        res.status(201).json(users);
    }catch(err) {
        console.log(err.message);
        return res.status(500).json({
            message: 'Unable to create a user',
        })
    }
}

//log in
exports.login= async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).send({
                message: 'invalid credentials'
            })
        }

// compare password
    const isMatch = await bcrypt.compare(password,user.password)
     if (!isMatch) {
         return res.status(400).send({
             message: 'invalid credentials'
         })
     }

//generate token
const token = jwt.sign(
    {
    id: user._id,
    role: user.role
},
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
);
     res.json({
         message: 'Logged in successfully',
         token,
         user:{
             id:user._id,
             name:user.name,
             role:user.role

         }
     })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Unable to login',
        })
    }
}




//get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users);
}

//get one user

exports.getUser = async (req, res) => {
    const { id } = req.params
    const users = await User.findById(id)
    if (!users) {
        res.status(404).json("User not found");
    }
    res.status(200).json(users);
}

//update User
exports.updateUser = async (req, res) => {
    const users = await User.findByIdandUpdate(req.params.id,req.body, {new:true})
    if (!users) {
        res.status(404).json("user not found");
    }
    res.status(200).json(users);
}

//delet user

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const users = await User.findByIdandDelete(id)
    if (!users) {
        res.status(404).json("user not found");
    }
    res.status(200).json(users);
}