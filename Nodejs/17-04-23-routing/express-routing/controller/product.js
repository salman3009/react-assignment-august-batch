exports.getlist =((req,res)=>{
    res.status(201).json({
        message:"list successful"
    })
})

exports.newList=((req,res)=>{
    res.status(200).json({
        message:"new list successful"
    })
})