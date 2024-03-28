const express = require('express');
const router = express.Router();
const Model_AlatTangkap = require('../model/model_alat_tangkap');


function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Terapkan middleware requireLogin pada setiap route yang ingin Anda proteksi
router.get('/', requireLogin, async function(req, res, next) {
    try {
        let rows = await Model_AlatTangkap.getAll();
        res.render('alat_tangkap/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', requireLogin, function (req, res, next) {
    res.render('alat_tangkap/create', {
        nama_alat_tangkap: ''
    });
});

router.get('/edit/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let alat_tangkap = await Model_AlatTangkap.getById(id);
        res.render('alat_tangkap/edit', {
            id: alat_tangkap.id_alat_tangkap,
            nama_alat_tangkap: alat_tangkap.nama_alat_tangkap
        });
    } catch (error) {
        next(error);
    }
});

router.post('/store', requireLogin, async function (req, res, next) {
    try {
        let { nama_alat_tangkap } = req.body;
        await Model_AlatTangkap.create({ nama_alat_tangkap });
        req.flash('success', 'Berhasil menyimpan data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data alat tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.post('/update/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_alat_tangkap } = req.body;
        await Model_AlatTangkap.update(id, { nama_alat_tangkap });
        req.flash('success', 'Berhasil memperbarui data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch {
        req.flash('error', 'Gagal memperbarui data alat tangkap');
        res.redirect('/alat_tangkap');
    }
});

router.get('/delete/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        await Model_AlatTangkap.delete(id);
        req.flash('success', 'Berhasil menghapus data alat tangkap');
        res.redirect('/alat_tangkap');
    } catch (error) {
        req.flash('error', 'Gagal menghapus data alat tangkap');
        res.redirect('/alat_tangkap');
    }
});

module.exports = router;
