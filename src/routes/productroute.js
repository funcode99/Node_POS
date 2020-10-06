const exp = require('express')
const routes = exp.Router() 
const controller = require ('../controller/productcontroller')
const validate = require('../middleware/validate')
const upload = require('../middleware/upload')
const cache = require ('../middleware/cache')

routes.get("/",  validate.Admin, cache.product, controller.all) //product/nama
routes.get('/search',  controller.search)
routes.post('/',  upload.single('image'), controller.add)
routes.put('/',  upload.single('image'), controller.edit)
routes.delete('/',  controller.delete)
routes.get('/sortHighestPrice',  controller.sortHighestPrice)
routes.get('/sortLowestPrice',  controller.sortLowestPrice)
routes.get('/sortName',  controller.sortName)
routes.get('/category', controller.category)
routes.post('/addhistory', controller.addhistory)
routes.get('/history', controller.history)
routes.get('/details', controller.details)


module.exports = routes