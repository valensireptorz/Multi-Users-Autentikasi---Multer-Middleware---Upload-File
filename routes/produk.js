// Import modul yang diperlukan
var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_Kategori = require('../model/Model_kategori');
const Model_Produk = require('../model/model_produk'); 
const Model_Users = require('../model/model_users');

// Konfigurasi multer untuk mengunggah file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/upload');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route untuk menampilkan daftar produk
router.get('/', async function (req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);
        if (Data.length > 0) {
            let rows = await Model_Produk.getAll();
            res.render('produk/index', {
                data: rows
            });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

// Route untuk menampilkan form tambah produk
router.get('/create', async function (req, res, next) {
    let rows = await Model_Kategori.getAll();
    res.render('produk/create', {
        data: rows
    });
});

// Route untuk menyimpan produk baru
router.post('/store', upload.single("foto_produk"), async function (req, res, next) {
    try {
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let Data = {
            nama_produk,
            harga_produk,
            id_kategori,
            foto_produk: req.file.filename
        };
        await Model_Produk.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/produk');
    } catch {
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/produk');
    }
});

// Route untuk menampilkan form edit produk
router.get('/edit/:id', async function (req, res, next) {
    let id = req.params.id;
    let kategoriRows = await Model_Kategori.getAll();
    let rows = await Model_Produk.getId(id);
    res.render('produk/edit', {
        data: kategoriRows,
        id: rows[0].id_produk,
        nama_produk: rows[0].nama_produk,
        harga_produk: rows[0].harga_produk,
        foto_produk: rows[0].foto_produk,
        id_kategori: rows[0].id_kategori,
        nama_kategori: rows[0].nama_kategori
    });
});

// Route untuk menyimpan perubahan pada produk
router.post('/update/:id', upload.single("foto_produk"), async function (req, res, next) {
    try {
        let id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Produk.getId(id);
        const namaFileLama = rows[0].foto_produk;
        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let foto_produk = filebaru || namaFileLama;
        let Data = {
            nama_produk,
            harga_produk,
            id_kategori,
            foto_produk
        };
        await Model_Produk.Update(id, Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/produk');
    } catch {
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/produk');
    }
});

// Route untuk menghapus produk
router.get('/delete/:id', async function (req, res, next) {
    let id = req.params.id;
    let rows = await Model_Produk.getId(id);
    const namaFileLama = rows[0].foto_produk;
    if (namaFileLama) {
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    await Model_Produk.Delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/produk');
});

// Export router
module.exports = router;