exports.registration =((req,res)=>{
    res.status(201).json({
        message:"registration successful"
    })
})

exports.login=((req,res)=>{
    res.status(200).json({
        message:"login successful"
    })
})