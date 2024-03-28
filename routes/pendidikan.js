const express = require("express");
const router = express.Router();
const ModelPendidikan = require("../model/model_pendidikan.js");
const ModelMahasiswa = require("../model/model_mahasiswa.js");
router.get("/", async function (req, res, next) {
    try {
      let rows = await ModelPendidikan.getAll();
      let mahasiswaData = await ModelMahasiswa.getAll(); // Ambil data mahasiswa
      res.render("pendidikan/index", {
        data: rows,
        mahasiswa: mahasiswaData, // Sertakan data mahasiswa saat merender halaman index.ejs
      });
    } catch (error) {
      req.flash("error", error.message || "Terjadi kesalahan pada server");
      res.redirect("/pendidikan");
    }
  });
  
router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelPendidikan.getAll();
    res.render("pendidikan/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/pendidikan");
  }
});

router.get("/create", async function (req, res, next) {
  try {
    let mahasiswaData = await ModelMahasiswa.getAll();
    res.render("pendidikan/create", {
      mahasiswa: mahasiswaData,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/pendidikan");
  }
});

router.post("/store", async function (req, res, next) {
  try {
    let {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      id_mahasiswa,
    } = req.body;
    let data = {
      nama_instansi: nama_instansi,
      jurusan: jurusan,
      tahun_masuk: tahun_masuk,
      tahun_lulus: tahun_lulus,
      nomor_ijazah: nomor_ijazah,
      id_mahasiswa: id_mahasiswa,
    };
    await ModelPendidikan.store(data);
    req.flash("success", "Berhasil menyimpan data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/pendidikan");
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let mahasiswaData = await ModelMahasiswa.getAll();
    let id = req.params.id;
    let rows = await ModelPendidikan.getById(id);
    res.render("pendidikan/edit", {
      mahasiswa: mahasiswaData,
      id: rows[0].id_pendidikan,
      nama_instansi: rows[0].nama_instansi,
      jurusan: rows[0].jurusan,
      tahun_masuk: rows[0].tahun_masuk,
      tahun_lulus: rows[0].tahun_lulus,
      nomor_ijazah: rows[0].nomor_ijazah,
      id_mahasiswa: rows[0].id_mahasiswa,
    });
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
    res.redirect("/pendidikan");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      id_mahasiswa,
    } = req.body;
    let data = {
      nama_instansi: nama_instansi,
      jurusan: jurusan,
      tahun_masuk: tahun_masuk,
      tahun_lulus: tahun_lulus,
      nomor_ijazah: nomor_ijazah,
      id_mahasiswa: id_mahasiswa,
    };
    await ModelPendidikan.update(id, data);
    req.flash("success", "Berhasil memperbarui data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/pendidikan");
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await ModelPendidikan.delete(id);
    req.flash("success", "Berhasil menghapus data");
  } catch (error) {
    req.flash("error", error.message || "Terjadi kesalahan pada server");
  }
  res.redirect("/pendidikan");
});

module.exports = router;