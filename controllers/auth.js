const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup handler
exports.signup = async (req, res) => {
    try{
        //fetch data
        const {name,email,password,role} = req.body;

        //now check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            });
        }


        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"error in hashing password",
            });

        }
        //create entry for new user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
        });

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in registering user",
        });
    }

}


//Login
exports.login = async (req,res) =>{
    try{
        //data fetch
        const {email,password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details",
            })
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            });
        }

        const payload = {
            email:user.email,
            id:user.id,
            role:user.role,
        }
        //verify password and generate a JWT token
        if(await bcrypt.compare(password,user.password)){
            //password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            res.cookie("cookiename", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            });

        }else{
            //password do not match
            return res.status().json({
                success:false,
                message:"Password Incorrect",
            });
        }



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        })

    }
}


// Logout
exports.logout = async (req, res) => {
    try {
        // Clear the cookie storing the token
        res.clearCookie("cookiename", { httpOnly: true, secure: true });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};
