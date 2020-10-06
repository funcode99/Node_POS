const model = require("../model/usermodel")
const respond = require("../helper/respond")
const hashPassword = require("../helper/hash")

class Users {
    
    async getAll(req, res) {
        try {
            const result = await model.getAll()
            return respond(res, 200, result)
        } catch (error) {
            return respond(res, 500, error)
        }
    }

    async getByUser(req, res) {
        try {
            const result = await model.getByUser(req.query.username)
            return respond(res, 200, result)
        } catch (error) {
            return respond(res, 500, error)
        }
    }

    async addUsers(req, res) {
        try {

            const passHash = await hashPassword(req.body.password)
            const data = {
                username: req.body.username,
                password: passHash,
                role : req.body.role
            }
            
            const result = await model.addUsers(data)
            return respond(res, 200, result)
        } catch (error) {
                return respond(res, 500, error)
        }
    }

    async delUsers(req, res) {
        try {
            const result = await model.delUsers(req.params.id)
            return respond(res, 200, result)
        } catch (error) {
            return respond(res, 500, error)
        }
    }

    async authUsers (req, res) {
        try {
          const username = req.body.username
          const passReq = req.body.password
      
          if (!Verifikasi.input(username, 'string')) return Respon(req, res, {code: 400, errMsg:"invalid username, it must be a string and contain no symbol(', <, >)", error:true})
          if (!Verifikasi.input(passReq, 'string')) return Respon(req, res, {code: 400, errMsg:"invalid password, it must be a string and contain no symbol(', <, >)", error:true})    
          
          const passDB = await model.getByUsername(username)
          if (passDB.length === 0) return Respon(req, res, {code: 200, errMsg:'Username atau Password salah', error:true})
      
          const check = await Bcrypt.compare(passReq, passDB[0].password)
      
          if (!check) return Respon(req, res, {code: 200, errMsg:'Username atau Password salah', error:true})
      
          const payload = {
            user: username,
            rule: passDB[0].rule
          }
      
          const token = JWT.sign(payload, (process.env.JWT_KEYS), { expiresIn: 60 })
          const hashToken = ObjectHash(token)
      
          await model.setToken(username, hashToken)
      
          return Respon(req, res, {code: 200, values:[{token}], success:true})
        } catch (error) {
          return Respon(req, res, {code: 500, errMsg:(error.message || 'Something wrong in the auth function'), error:true})
        }
      }
      
      async logoutUsers (req, res) {
        try {
          const username = req.user
      
          const result = await model.logout(username)
          if (result.rowCount === 0) return Respon(req, res, {code: 400, errMsg: 'Username not found'})
          if (req.newToken) req.newToken = null
      
          return Respon(req, res, {code: 200, success: true})
        } catch (error) {
          return Respon(req, res, {code: 500, errMsg:(error.message || 'Something wrong in the logout function')})
        }
    }


}

module.exports = new Users()