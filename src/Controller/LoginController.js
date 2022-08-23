const userModel=require('../Model/User')

const jwt=require("jsonwebtoken")
const login = async (req, res) => {

    try {
        const { username, password } = req.body
        if (!Object.keys(req.body).length > 0) {
            return res.status(400).send({ status: false, message: "Missing data in request,please kindly recheck" })
        }
        const user = await userModel.findOne({ username: username, password: password })
        if (!user) {
            return res.status(401).send({ status: false, message: "Incorrect credentials" })
        }
        const token = jwt.sign({
            id: user._id,
           
        }, "my-test")
        res.setHeader("x-key", token);
        return res.status(200).send({ status: true, message: "login successfully", data: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.login = login