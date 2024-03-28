const express = require('express');
const router = express.Router();
const ModelKapal = require('../model/model_kapal.js');
const ModelPemilik = require('../model/model_pemilik.js');
const ModelDpi = require('../model/model_dpi.js');
const ModelAlatTangkap = require('../model/model_alat_tangkap.js');

// Middleware untuk memeriksa apakah pengguna sudah login
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        // Jika session userId ada (artinya pengguna sudah login), lanjutkan ke route berikutnya
        return next();
    } else {
        // Jika session userId tidak ada (artinya pengguna belum login), redirect ke halaman login
        res.redirect('/login');
    }
}

// Terapkan middleware requireLogin pada setiap route yang ingin Anda proteksi
router.get('/', requireLogin, async function (req, res, next) {
    try {
        let rows = await ModelKapal.getAll();
        let pemilikData = await ModelPemilik.getAll();
        let dpiData = await ModelDpi.getAll();
        let alatTangkapData = await ModelAlatTangkap.getAll();
        res.render('kapal/index', {
            data: rows,
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});

router.get('/create', requireLogin, async function (req, res, next) {
    try {
        let pemilikData = await ModelPemilik.getAll();
        let dpiData = await ModelDpi.getAll();
        let alatTangkapData = await ModelAlatTangkap.getAll();
        res.render('kapal/create', {
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});

router.post('/store', requireLogin, async function (req, res, next) {
    try {
        let {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        } = req.body;
        let data = {
            nama_kapal: nama_kapal,
            id_pemilik: id_pemilik,
            id_dpi: id_dpi,
            id_alat_tangkap: id_alat_tangkap
        };
        await ModelKapal.store(data);
        req.flash('success', 'Berhasil menyimpan data');
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
    }
    res.redirect('/kapal');
});

router.get('/edit/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let kapalData = await ModelKapal.getById(id);
        let pemilikData = await ModelPemilik.getAll();
        let dpiData = await ModelDpi.getAll();
        let alatTangkapData = await ModelAlatTangkap.getAll();
        
        if (!kapalData) {
            throw new Error('Data kapal tidak ditemukan');
        }
        
        res.render('kapal/edit', {
            id: id,
            nama_kapal: kapalData.nama_kapal || '',
            pemilik: pemilikData,
            dpi: dpiData,
            alatTangkap: alatTangkapData
        });
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});

router.post('/update/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        } = req.body;
        let data = {
            nama_kapal: nama_kapal,
            id_pemilik: id_pemilik,
            id_dpi: id_dpi,
            id_alat_tangkap: id_alat_tangkap
        };
        await ModelKapal.update(id, data);
        req.flash('success', 'Berhasil memperbarui data');
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
    }
    res.redirect('/kapal');
});

router.get('/delete/:id', requireLogin, async function (req, res) {
    try {
        let id = req.params.id;
        await ModelKapal.delete(id);
        req.flash('success', 'Berhasil menghapus data');
    } catch (error) {
        req.flash('error', error.message || 'Terjadi kesalahan pada server');
    }
    res.redirect('/kapal');
});

module.exports = router;
