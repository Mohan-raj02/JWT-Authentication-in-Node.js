const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// registration api - /api/v1/register
exports.userRegister = async(req, res, next) => {

    try{
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: 'user registered successfully',
            user: {
                id: savedUser._id,
                username: savedUser.username
            }
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error:error.message
        })
    }
}


// login api - /api/v1/login
exports.userLogin = async(req, res, next) => {

    try{

        const { username,password } = req.body;

        const oldUser = await userModel.findOne({
            username: username
        });

        if(!oldUser){
            return res.status(401).json({error: 'Authentication failed'});
        }

        const passwordMatch = await bcrypt.compare(password, oldUser.password);
        if(!passwordMatch) {
            return res.status(401).json({error: 'Authentication failed'});
        }

        const token = jwt.sign({ userId : oldUser._id}, 'your-secret-key', {
            expiresIn: '5h',
        });
            res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}