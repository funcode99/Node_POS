const product = {}
const database = require('../config/db')

product.GetAll = () => {
    return new Promise ((resolve, reject) => {
        database.query("SELECT * FROM product")
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.Details = (id) => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT productname, price, "Image", "categoryID" FROM product WHERE id = '${id}';`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}


product.Add = (addData) => {
    return new Promise ((resolve, reject) => {
        database.query(`INSERT INTO product (productname, price, "categoryID", "Image") VALUES('${addData.name}', '${addData.price}', '${addData.categoryID}', '${addData.image}');`) 
        .then (res => {
            resolve(res)
        })
        .catch (err => {
            reject(err)
           
        })
    })
}


product.Edit = (editData) => {
    return new Promise ((resolve, reject) => {
        database.query(`UPDATE product SET id='${editData.id}', productname='${editData.name}',  price='${editData.price}', "categoryID"='${editData.categoryID}', "Image"='${editData.image}' WHERE id='${editData.id}';`)
        .then (res => {
            resolve(res)
        })
        .catch (err => {
            reject(err)
        })
    }) 
}

product.Delete = (id) => {
    return new Promise ((resolve, reject) => {
        database.query(`DELETE FROM product WHERE id='${id}';`)
        .then (res => {
            resolve(res)
        })
        .catch (err => {
            reject(err)
        })
    })
}


product.Search = (productname) => {
    return new Promise ((resolve, reject)=> {
        database.query(`SELECT productname, price, "Image" FROM product WHERE productname ILIKE '%${productname}%';`)
        .then (res => {
            resolve(res)
        })
        .catch (err => {
            reject(err)
        })
    }) 
    
}

product.SortHighestPrice = () => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT productname, price, "Image" FROM product ORDER BY price DESC;`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.SortLowestPrice = () => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT productname, price, "Image" FROM product ORDER BY price ASC;`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.SortName = () => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT productname, price, "Image" FROM product ORDER BY productname ASC;`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.Category = (categoryID) => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT productname, price, "categoryList", "Image" FROM product INNER JOIN category USING ("categoryID") WHERE "categoryID" = '${categoryID}';`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.addHistory = (invoices, cashier, date, orders, amount) => {
    return new Promise ((resolve, reject) => {
        database.query(`INSERT INTO history ("Invoices", "Cashier", "date", "Orders", "Amount") VALUES('${invoices}', '${cashier}', '${date}',  '${orders}', '${amount}');`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.history = () => {
    return new Promise ((resolve, reject) => {
        database.query(`SELECT * FROM history`)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}


module.exports = product