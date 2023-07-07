const mongoose = require("mongoose");
const User = require("../modal/User");

const authController = require("express").Router();

authController.post("/register",async(req,res)=>{
    
    try {
        const user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(203).json("already exists!");
        }

        const newUser = User.create({...req.body});
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).send("error while signing up!");
    }
})


authController.post("/login",async(req,res)=>{
        
    try {
        const user = await User.findOne({email : req.body.email});
        console.log(user);
        if(!user){
            return res.status(204).json("No such user exists!");
        }

        if(user.password!=req.body.password){
            return res.status(205).json("wrong password!");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).send("error while signing up!");
    }
})

authController.post("/cartProduct",async(req,res)=>{
    
    try {
        
        const product = await User.updateOne({email : req.body.email},{$push : {cart : req.body.ele}});
        return res.status(200).json("added to cart!");
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
   
})


authController.post("/getCart",async(req,res)=>{
    
    try {
        
        const product = await User.findOne({email : req.body.email});
        console.log(product);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
   
})

authController.post("/deleteCart",async(req,res)=>{
    
    try {
        
        const product = await User.updateOne({email : req.body.email},{$pull : {cart : {_id : req.body.id}}});
        console.log(product);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
   console.log(req.body);
})


module.exports = authController;