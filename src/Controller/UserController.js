const userModel=require('../Model/User')
const bcrypt = require('bcrypt')
const user = async function(req,res) {
    try{
      console.log(req.body)
        if(Object.keys(data).length == 0){
            return res.status(400).send({message:"please provide data"})
        }
        let username=req.body.username
        let password =req.body.password
         
         if(!username)
         return res.status(400).send({message:"please provide username"})
         
         if(!password)
         return res.status.send(400).send({message:"please provide password"})

         const User=await userModel.create(req.body)
         return res.status(201).send({data:User, message:"user registers successfully"})
    }
    catch(err){
        console.log(err)
         return res.status(500).send({message:err.message})
    }
}
module.exports.user=user
