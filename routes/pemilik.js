const express = require('express');
const router = express.Router();
const Model_Pemilik = require('../model/model_pemilik');

function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login'); 
    }
}


router.get('/', requireLogin, async function(req, res, next) {
    try {
        let rows = await Model_Pemilik.getAll();
        res.render('pemilik/index', {
            data: rows
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', requireLogin, function (req, res, next) {
    res.render('pemilik/create', {
        nama_pemilik: '',
        alamat: '',
        no_hp: ''
    });
});

router.get('/edit/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let pemilik = await Model_Pemilik.getById(id);
        res.render('pemilik/edit', {
            id: pemilik.id_pemilik,
            nama_pemilik: pemilik.nama_pemilik,
            alamat: pemilik.alamat,
            no_hp: pemilik.no_hp
        });
    } catch (error) {
        next(error);
    }
});

router.post('/store', requireLogin, async function (req, res, next) {
    try {
        let { nama_pemilik, alamat, no_hp } = req.body;
        await Model_Pemilik.create({ nama_pemilik, alamat, no_hp });
        req.flash('success', 'Berhasil menyimpan data pemilik');
        res.redirect('/pemilik');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data pemilik');
        res.redirect('/pemilik');
    }
});

router.post('/update/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_pemilik, alamat, no_hp } = req.body;
        await Model_Pemilik.update(id, { nama_pemilik, alamat, no_hp });
        req.flash('success', 'Berhasil memperbarui data pemilik');
        res.redirect('/pemilik');
    } catch {
        req.flash('error', 'Gagal memperbarui data pemilik');
        res.redirect('/pemilik');
    }
});

router.get('/delete/:id', requireLogin, async function (req, res, next) {
    try {
        let id = req.params.id;
        await Model_Pemilik.delete(id);
        req.flash('success', 'Berhasil menghapus data pemilik');
        res.redirect('/pemilik');
    } catch (error) {
        req.flash('error', 'Gagal menghapus data pemilik');
        res.redirect('/pemilik');
    }
});

module.exports = router;
