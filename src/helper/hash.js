const bcr = require('bcrypt')


async function hashPassword (password) {
    try {
        const salt = await bcr.genSalt(6)
        const result = await bcr.hash(password, salt)
       
        return result
    } catch (error) {
        throw error
    }
}

module.exports = hashPassword