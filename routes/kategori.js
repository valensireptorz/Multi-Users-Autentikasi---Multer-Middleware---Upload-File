const express = require('express');
const router = express.Router();
const Model_Kategori = require('../model/Model_kategori');

router.get('/', async function(req, res, next) {
    let rows = await Model_Kategori.getAll();
    res.render('kategori/index',{
        data: rows
    });
});

router.get('/create', function (req, res, next) {
    res.render('kategori/create', {
      nama_kategori: ''
    });
});

router.get('/edit/(:id)', async function (req, res, next) {
    
        let id = req.params.id;
        let rows = await Model_Kategori.getid(id);
        res.render('kategori/edit', {
            id:                  rows[0].id_kategori,
            nama_kategori:       rows[0].nama_kategori
        });
    
});

router.post('/store', async function (req, res, next) {
    try {
        let { nama_kategori } = req.body;
        let Data = {
            nama_kategori
        };
        await Model_Kategori.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/kategori');
    } catch (error) {
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/kategori');
    }
});

router.post('/update/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kategori } = req.body;
        let Data = {
            nama_kategori
        };
        await Model_Kategori.Update(id, Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/kategori');
    } catch{
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/kategori');
    }
});

router.get('/delete/(:id)', async function (req, res, next) {
    
        let id = req.params.id;
        await Model_Kategori.Delete(id);
        req.flash('success', 'Berhasil menghapus data');
        res.redirect('/kategori');
    
});

module.exports = router;
