const express = require("express")
const router = express.Router()
const multiparty = require('connect-multiparty') 
const userController = require("../Controller/UserController")
const fileController = require("../Controller/FileController")
const loginController = require("../Controller/LoginController")
const path = require('path')
const fileMulti = multiparty({uploadDir:path.resolve(__dirname,"uploads")})  //uploadDir = inbuilt object
const auth = require("../auth/auth.js")

//------------------API's-----------------------------------------------------------------------------------

router.post('/user', userController.user)
router.post('/login', loginController.login)
router.post('/uploadFile', auth.authentication,fileMulti,fileController.uploadFile)
 router.get('/getUploadedFile/:userId', fileController.getUploadedFile)
 router.delete('/deleteFile/:userId', auth.authentication,auth.authorization,fileController.deleteFile)
 router.get('/DownloadFile/:id', fileController.getUploadedFile)


module.exports = router;