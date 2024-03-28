const express = require('express');
const router = express.Router();
const Model_DPI = require('../model/model_dpi');

function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', requireLogin, async function(req, res, next) {
    try {
        let rows = await Model_DPI.getAll();
        res.render('dpi/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', requireLogin, function (req, res, next) {
    res.render('dpi/create', {
        nama_dpi: '',
        luas: ''
    });
});

router.get('/edit/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let dpi = await Model_DPI.getById(id);
        res.render('dpi/edit', {
            id: dpi.id_dpi,
            nama_dpi: dpi.nama_dpi,
            luas: dpi.luas
        });
    } catch (error) {
        next(error);
    }
});

router.post('/store', requireLogin, async function (req, res, next) {
    try {
        let { nama_dpi, luas } = req.body;
        await Model_DPI.create({ nama_dpi, luas });
        req.flash('success', 'Berhasil menyimpan data DPI');
        res.redirect('/dpi');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data DPI');
        res.redirect('/dpi');
    }
});

router.post('/update/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_dpi, luas } = req.body;
        await Model_DPI.update(id, { nama_dpi, luas });
        req.flash('success', 'Berhasil memperbarui data DPI');
        res.redirect('/dpi');
    } catch {
        req.flash('error', 'Gagal memperbarui data DPI');
        res.redirect('/dpi');
    }
});

router.get('/delete/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        await Model_DPI.delete(id);
        req.flash('success', 'Berhasil menghapus data DPI');
        res.redirect('/dpi');
    } catch (error) {
        req.flash('error', 'Gagal menghapus data DPI');
        res.redirect('/dpi');
    }
});

module.exports = router;
