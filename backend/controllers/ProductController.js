const ProductController = require("express").Router();
const Product = require("../modal/Product");

ProductController.post("/addProduct",async(req,res)=>{
    
    try {
        
        const product = await Product.create({...req.body});
        console.log(product);
        return res.status(201).json("Added Product!");
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
})

ProductController.get("/getProducts",async(req,res)=>{
    
    try {
        
        const products = await Product.find({method : "product"});
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
})

ProductController.post("/getVendorProducts",async(req,res)=>{
    
    try {
        
        const products = await Product.find({publishedBy : req.body.email , method : "product"});
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
})

ProductController.post("/getVendorDrafts",async(req,res)=>{
    
    try {
        
        const products = await Product.find({publishedBy : req.body.email , method : "draft"});
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
})


ProductController.post("/deleteProduct",async(req,res)=>{
    
    try {
        
        const products = await Product.deleteOne({_id : req.body.id});
        return res.status(200).json("deleted!");
    } catch (error) {
        return res.status(400).json("Unable to add Product now!")
    }
})


module.exports = ProductController;