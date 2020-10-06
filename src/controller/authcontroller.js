const model = require("../model/usermodel")
const respond = require("../helper/respond")
const bcr = require("bcrypt")
const jwt = require("jsonwebtoken")
const Token = require("../middleware/validate")

class Auth {

    login = async (req, res) => {
        try {
            const passDB = await model.getByUser(req.body.username)

            if (passDB.length <= 0) {
                return respond(res, 200, "Username not found")
            }

            
            const passReq = req.body.password
            const checkPw = await bcr.compare(passReq, passDB[0].password)


            if  (checkPw) {
                const result = await this.setToken(req.body.username, req.body.role)
               
                return respond(res, 200, result)
                
            } else {
                return respond(res, 200, "Login failed")
            }

        } catch (error) {
            console.log(error)
            respond(res, 500, error)
        }
    }

    setToken = async (user,role) => {
        try {
            const payload = {
                user: user,
                role: role,
            }
            
            const token = jwt.sign(payload, process.env.JWT_KEYS)
            const genToken = await model.setToken(user,token)
            

            const result = {
                token: token,
                msg: "Token created, login success",
                "token_type": "bearer",

            }

            return result
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Auth()