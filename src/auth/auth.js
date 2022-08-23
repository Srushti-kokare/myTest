// const jwt = require("jsonwebtoken");
// const userModel = require("../Model/User");


// const authentication = async (req, res, next) => {
//     try {
//         let token = req.headers["x-key"];
//         if (!token) {
//             return res.status(401).send({ status: false, message: "Header missing" })
//         }
//         let decodedToken = jwt.verify(token, "my-test")
//         if (!decodedToken) return res.status(401).send({ status: false, message: 'Invalid token' })

//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
//     next()
// }

// const authorisation = async (req, res, next) => {
//     try {
//         let token = req.headers["x-key"];
//         let decodedToken = jwt.verify(token, "my-test");
//         let userLoggedIn = decodedToken.id
//         let value = await userModel.findById( req.params.userId)
//         if (!value) return res.status(404).send({ status: false, message: "user not found" })
//         if (value.userId != userLoggedIn) return res.status(403).send({ status: false, message: "unauthorised access " })
//     }
//     catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
//     next()
// }


// module.exports.authentication = authentication
// module.exports.authorisation = authorisation
const jwt = require("jsonwebtoken")
const authentication = function(req,res,next){
    try{
        let token = req.headers["authorization"]
        if(!token)
        return res.status(401).send({status: false, msg:"Token is not present"})
    
        // let decodedToken = jwt.verify(token,"Group24")
        

        let bearerHeader = token && token.split(' ')[1];
        let decodedToken =  jwt.verify(bearerHeader,"my-test", { ignoreExpiration: true })
        if(!decodedToken)
        return res.status(401).send({status:false,msg:"Token is invalid"})
    next()
    }
    catch(error)
    {
        res.status(500).send({status : false,msg : error.message})
    }
}
const authorization = function(req, res, next) {
    
    try{
        let token = req.headers["authorization"]
        if(!token)
        return res.status(401).send({status: false, msg:"Token not present"})
    
    
        let bearerHeader = token && token.split(' ')[1];
        let decodedToken =  jwt.verify(bearerHeader,"my-test", { ignoreExpiration: true })

        if(!decodedToken)
        return res.status(401).send({status:false,msg:"Token is invalid"})
    
        let userId = req.params.userId
        console.log(userId)
        if (!userId)
        return res.status(400).send({ status: false, msg: "Please Send User Id" })

        let userLoggedIn = decodedToken.userId
         
        if(userId == userLoggedIn ){
             
          return res.status(403).send({status : false, msg : "User is not Allowed access the request"})
        } next()
    }
        catch(error)
        {   console.log(error)
           return res.status(500).send({status: false ,msg : error.message})
        }

    
}

    module.exports.authorization=authorization
    module.exports.authentication=authentication