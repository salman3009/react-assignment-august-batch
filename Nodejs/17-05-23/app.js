const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.post('/upload',(req,res)=>{
    if(req.files){
        const uploadedFile = req.files.uploadFile;
        const uploadPath = __dirname + "/uploads/"+uploadedFile.name;
        uploadedFile.mv(uploadPath,(err)=>{
           if(err){
            res.send("error");
           }
           else{
            res.send("successfully uploaded");
           }
        })
    }
})




app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.listen(3000,()=>{
    console.log("server running on 3000");
})