const db = require("../config/db")

class Users {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM "user" `)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getByUser(user) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM "user" WHERE username = '${user}'`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getById(idusers) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM "user" WHERE id = ${idusers}`)
                .then((res) => {
                    resolve(res.rows)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    addUsers(data) {
        const q = `INSERT INTO "user"(username, password, role) VALUES ('${data.username}','${data.password}', '${data.role}')`
        return new Promise((resolve, reject) => {
            db.query(q)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    delUsers(idUsers) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM "user" WHERE id = ${idUsers}`)
                .then((res) => {
                    resolve(`id ${idUsers} has been deleted`)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    setToken(username, token) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE "user" SET token = '${token}'  WHERE username = '${username}'`)
                .then((username) => {
                    resolve(`token set in user : ${username}`)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    getToken = async (user) => {
        return new Promise((resolve, reject) => {
        const sql = `SELECT token,role FROM "user" WHERE username='${user}'`
        db.query(sql)
            .then(res => resolve(res.rows))
            .catch(err => reject(err))
        })
    }

    logout = async (username) => {
        return new Promise((resolve, reject) => {
          const sql = `UPDATE "user" SET token='' WHERE username='${username}'`
          MyDB.query(sql)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
      }


}

   




module.exports = new Users()