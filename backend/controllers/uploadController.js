const uploadController = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,"./images");
    },
    filename : (req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage});

uploadController.post("/upload",upload.single("image"),(req,res)=>{
    
        console.log(req.file);
    
})

module.exports = uploadController;