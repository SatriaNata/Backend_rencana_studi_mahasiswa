require('dotenv').config()
const { env } = process;

class callback extends Error {
    constructor(code, message) {
        super(message); 
        this.name = this.constructor.name; 
        this.statusCode = code; 
    }

    
    static data_not_found() {
        return new this(1000, 'data_not_found')
    }
    static nama_jurusan_already_exist() {
        return new this(1001, 'nama_jurusan_already_exist')
    }

    static kode_jurusan_already_exist() {
        return new this(1002, 'kode_jurusan_already_exist')
    }
    
    static mahasiswa_not_found() {
        return new this(1003, 'mahasiswa_not_found')
    }

    static mata_kuliah_not_found() {
        return new this(1004, 'mata_kuliah_not_found')
    }

    static max_take_mata_kuliah() {
        return new this(1005, `max_take_mata_kuliah ${+env.MAX_MATA_KULIAH}`)
    }
    
    static max_mata_kuliah_taken() {
        return new this(1006, `max_mata_kuliah_taken ${+env.MAX_MAHASISWA}`)
    }
    
    static wrong_format_email() {
        return new this(1007, 'wrong_format_email')
    }

    static wront_format_nim() {
        return new this(1008, `nim length: ${+env.LENGTH_NIM}`)
    }

}


module.exports = callback