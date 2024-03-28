const express = require("express");
const router = express.Router();
const ModelKeahlian = require("../model/model_keahlian.js");
const ModelMahasiswa = require("../model/model_mahasiswa.js");

// Rute untuk menampilkan semua keahlian
router.get("/", async function (req, res, next) {
  try {
    // Ambil data keahlian
    let rows = await ModelKeahlian.getAll();
    // Ambil data mahasiswa
    let mahasiswaData = await ModelMahasiswa.getAll();
    // Render halaman index.ejs dengan data keahlian dan mahasiswa
    res.render("keahlian/index", {
      data: rows,
      mahasiswa: mahasiswaData,
    });
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

// Rute untuk menampilkan halaman form pembuatan keahlian baru
router.get("/create", async function (req, res, next) {
  try {
    // Ambil data mahasiswa
    let mahasiswaData = await ModelMahasiswa.getAll();
    // Render halaman create.ejs dengan data mahasiswa
    res.render("keahlian/create", {
      mahasiswa: mahasiswaData,
    });
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

// Rute untuk menyimpan data keahlian baru
router.post("/store", async function (req, res, next) {
  try {
    // Ambil data dari body request
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian: nama_keahlian,
      tingkat_keahlian: tingkat_keahlian,
      id_mahasiswa: id_mahasiswa,
    };
    // Simpan data keahlian baru
    await ModelKeahlian.store(data);
    req.flash("success", "Berhasil menyimpan data");
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

// Rute untuk menampilkan halaman form pengeditan keahlian
router.get("/edit/:id", async function (req, res, next) {
  try {
    // Ambil data mahasiswa
    let mahasiswaData = await ModelMahasiswa.getAll();
    let id = req.params.id;
    // Ambil data keahlian berdasarkan ID
    let rows = await ModelKeahlian.getById(id);
    // Render halaman edit.ejs dengan data keahlian dan mahasiswa
    res.render("keahlian/edit", {
      mahasiswa: mahasiswaData,
      id: rows[0].id_keahlian,
      nama_keahlian: rows[0].nama_keahlian,
      tingkat_keahlian: rows[0].tingkat_keahlian,
      id_mahasiswa: rows[0].id_mahasiswa,
    });
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/keahlian");
  }
});

// Rute untuk menyimpan perubahan data keahlian
router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
    let data = {
      nama_keahlian: nama_keahlian,
      tingkat_keahlian: tingkat_keahlian,
      id_mahasiswa: id_mahasiswa,
    };
    // Perbarui data keahlian berdasarkan ID
    await ModelKeahlian.update(id, data);
    req.flash("success", "Berhasil memperbarui data");
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

// Rute untuk menghapus data keahlian
router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    // Hapus data keahlian berdasarkan ID
    await ModelKeahlian.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    // Tangani kesalahan
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/keahlian");
});

module.exports = router;
