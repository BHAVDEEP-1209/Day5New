const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    publishedBy : {
        type: String,
        required: true
    },
    method : {
        type: String,
        required: true
    },
},{timestamps : true})

module.exports = mongoose.model("Product",ProductSchema);