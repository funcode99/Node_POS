const response = require("../config/response")
const ModelUser = require('../model/usermodel')
const JWT = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const ObjectHash = require('object-hash')
const Hash = require('../helper/hash')
const Bcrypt = require('bcrypt')
var fs = require('fs')
const Token = {}

Token.Refresh = async (req) => {
  const tokenReq = req.headers.token
  const { user } = jwtDecode(tokenReq)
  const dataDb = await ModelUser.getToken(user)
  if (dataDb.length <= 0) return false

  const isitoken =  dataDb[0].token
  console.log(isitoken)
  console.log(tokenReq)
 
  const checkToken = (tokenReq) === isitoken
  if (!checkToken) return console.log('checktoken gagal')
  
 else {
     console.log('masuk ke sini berhasil')
   
    const payload = {
      user:user
    }
  
    const newToken = JWT.sign(payload, (process.env.JWT_KEYS), { expiresIn: 6000 })
    // await ModelUser.setToken(user, newToken)
    req.newToken = newToken
    return true
 }

  
}

Token.Admin = async (req, res, next) => {
  const token = req.headers.token
  const { user } = jwtDecode(token)
  const dataDb = await ModelUser.getToken(user)
  
  if (dataDb.length <= 0) return false
  if (!token) return response(req, res, {code:401, errMsg:'you are not login yet', error:true})

  
  const isi = jwtDecode(token)
  console.log(isi)
  if (dataDb[0].role !== 'admin') return response(req,  res, {code:401, errMsg:`you don't have permission to access`, error:true})


  JWT.verify(token, (process.env.JWT_KEYS), async (err, decode) => {
    if (err) {
      if (err.message !== 'jwt expired') return response(req, res, {code:500, errMsg:err.message, error:true})
      const newToken = await Token.Refresh(req)
      if (!newToken) return response(req, res, {code:401, errMsg:'token expired or failed to renewed', error:true})
    }
    
    next()
  })
}

Token.user = (req, res, next) => {
  const token = req.headers.token

  if (!token) return res.send(response.Failed(401, 'not login, please login to continue'))

  JWT.verify(token, (process.env.JWT_KEYS), async (err, decode) => {
    if (err) {
      if (err.message !== 'jwt expired') return res.send(response.Failed(401, err.message))
      const newToken = await Token.Refresh(req)
      if (!newToken) return res.send(response.Failed(401, 'token invalid'))
    }
    
    next()
  })
}

module.exports = Token