const product = {}
const model = require('../model/productmodel')
const respond = require('../helper/respond')
const redis = require("../config/redis")

product.all = async (req, res)  => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisconn.setex("cachedata", 25,  data_redis)
        return res.status(200).json(data.rows)
    }
    catch (error) {
        return res.status(500).send('gagal mendapat data')
    }
}

product.details = async (req, res)  => {
    try {
        const id = req.query.id
        const data = await model.Details(id)
        return res.status(200).json(data.rows)
    }
    catch (error) {
        return res.status(500).send('gagal mendapat data')
    }
}


    product.add = async (req, res) => {

        try {

            if (req.file === undefined) {
                return res.status(500).json("Your image file is empty")
            }
            
            const addData = {
                name: req.body.productname,
                price : req.body.price,
                image: req.file.path,
                categoryID: req.body.categoryID
            }
            const data = await model.Add(addData)
            console.log(data)
            return respond (res, 201, addData)
        }
        catch(error){
                return res.status(500).json(error)
        }
    }

    product.delete = async (req, res) => {
        try{
                const id = req.query.id
                const data = await model.Delete(id)
                return res.status(200).send(data.rows) 
        }
        catch(error){
        return res.status(500).send('gagal menghapus data')
        }
    }


product.search = async (req, res) => {
  try{
      const name = req.query.name
      const data = await model.Search(name)
      if (data.rowCount > 0) {
        return res.status(200).send(data.rows)
    } else {
        return res.send("tidak ditemukan!")
    }
  }
  catch(error) {
      return res.status(500).send('gagal mencari data')
  }
}

product.sortHighestPrice = async (req, res) => {
    try{
        const data = await model.SortHighestPrice()
        return res.status(200).send(data.rows)
    }
    catch(error){
        return res.status(500).send('gagal menyortir data')
    }
}

product.sortLowestPrice = async (req, res) => {
    try{
        const data = await model.SortLowestPrice()
        return res.status(200).send(data.rows)
    }
    catch(error){
        return res.status(500).send('gagal menyortir data')
    }
}

product.sortName = async (req, res) => {
    try{
        const data = await model.SortName()
        return res.status(200).send(data.rows)
    }
    catch(error){
        return res.status(500).send('gagal menyortir data')
    }
}


product.edit = async (req, res) => {

    try {
        if (req.file === undefined) {
            return res.status(500).json("Your image file is empty")
        }

        const editData = {
            id : req.body.id,
            name: req.body.productname,
            price : req.body.price,
            image: req.file.path,
            categoryID: req.body.categoryID
        }
        const data = await model.Edit(editData)
        console.log(data)
        return respond (res, 201, editData)
    }
    catch(error){
            return res.status(500).json('tidak dapat mengupdate data')
    }
//     try{
//         const id= req.query.id
//         const name = req.query.name
//         const price = req.query.price
//         const categoryID = req.query.categoryID
//         const image = req.file.path
//         const data = model.Edit(id, name, price, categoryID, image)
//         return res.send(data.rows)
//     }
//    catch(error) {
//     return res.status(500).send('gagal mengubah data')
//    }
}

product.category  = async (req, res) => {
    try{
        const {categoryID} = req.body
        const data = await model.Category(categoryID)
        return res.status(200).send(data.rows)
    }
    catch(error) {
        return res.status(500).json('gagal mengkategorikan data')
    }
  }

  product.addhistory  = async (req, res) => {
    try{
        const {invoices, cashier, date, orders, amount} = req.body
        const data = await model.addHistory(invoices, cashier, date, orders, amount)
        return res.status(200).send(data.rows)
    }
    catch(error) {
        return res.status(500).json('gagal menambahkan data')
    }
  }

  product.history =  async (req, res) => {
    try{
        const {} = req.body
        const data = await model.history()
        return res.status(200).send(data.rows)
    }
    catch(error) {
        return res.status(500).json('gagal menampilkan data')
    }
  }


module.exports = product