var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var Model_Users = require('../model/model_users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
    let { email, password } = req.body;
    let enkripsi = await bcrypt.hash(password, 10);
    let Data = {
        email,
        password: enkripsi
    };
    await Model_Users.Store(Data);
    req.flash('success', 'Berhasil Login');
    res.redirect('/login');
});

router.post('/log', async (req, res) => {
    let { email, password } = req.body;
    try {
      let data = await Model_Users.Login(email);
      if (data.length > 0) {
        let enkripsi = data[0].password;
        let cek = await bcrypt.compare(password, enkripsi);
        if (cek) {
          req.session.userId = data[0].id_users;
          // Tambahkan kondisi pengecekan level pada user yang login
          if (data[0].level_users == 1) {
            req.flash('success', 'Berhasil login');
            res.redirect('/superusers');
          } else if (data[0].level_users == 2) {
            req.flash('success', 'Berhasil login');
            res.redirect('/users');
          } else {
            res.redirect('/login');
          }
          // Akhir kondisi
        } else {
          req.flash('error', 'Email atau password salah');
          res.redirect('/login');
        }
      } else {
        req.flash('error', 'Akun tidak ditemukan');
        res.redirect('/login');
      }
    } catch (err) {
      req.flash('error', 'Error pada fungsi');
      res.redirect('/login');
    }
  });
  

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;
