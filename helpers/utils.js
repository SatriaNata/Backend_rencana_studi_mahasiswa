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
}

module.exports = utils