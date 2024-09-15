const validator = require('validator');
require('dotenv').config()
const { env } = process;

class utils {
    static check_format_format(email) {
        return validator.isEmail(email)
    }

    static check_format_nim(nim) {
        return validator.isLength(nim, {min:+env.LENGTH_NIM, max:+env.LENGTH_NIM})
    }

    static isUUID(uuid) {
        const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        return uuidRegex.test(uuid)
    }
}

module.exports = utils