//import express instance
const express= require("express");
const router = express.Router();

const {signup,login,logout} = require("../controllers/auth");
const{auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup", signup);
router.post("/logout", logout);

//Protected route
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for students",
    });
})

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for admin",
    });
})


module.exports = router;