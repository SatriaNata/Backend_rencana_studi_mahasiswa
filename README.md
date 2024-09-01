# rencana_studi_mahasiswa

Pastikan sudah terinstall NodeJS dan MySQL pada device anda

Pada project ini NodeJS yang digunakan adalah versi 20.17 dan npm versi 10.8, serta MySQL versi 8.0

Step-step untuk menjalankan project
## Clone
lakukan clone project, pilih folder yang akan digunakan untuk project ini
```bash
git clone https://github.com/SatriaNata/Backend_rencana_studi_mahasiswa.git
```

setelah clone buka text editor dan buka project yang sudah di clone

```bash
# install dependencies
npm install
```

## **Configuration database & migration**
buat file .env dan isi dengan configurasi yang dibutuhkan 
```bash
# env
MYSQL_HOST=
MYSQL_PORT=
DB_NAME=
MYSQL_USERNAME=
MYSQL_PASSWORD=

MAX_MATA_KULIAH=
MAX_MAHASISWA=
LENGTH_NIM=
```

## migration db
```bash
# db migration
npx sequelize db:migrate

# db seed
npx sequelize-cli db:seed:all
```

## jalankan program
```bash
# env
npm run start

dan program akan berjalan pada port localhost:3000/be/(nama router terdapat pada router.js)
```

API Documentation using postman
```bash
https://documenter.getpostman.com/view/16027990/2sAXjM3X6C
```
