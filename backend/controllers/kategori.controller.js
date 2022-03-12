const Kategori = require("../models/kategori.model");
//--------------------------------------------------------------------------------------
// controller temukan semua data
exports.findAll = (req, res) => {
    Kategori.getAllKategori((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "ada beberapa yang error."
        });
      else res.send(data);
    });
};

//--------------------------------------------------------------------------------------
// controller temukan data per-id
exports.findOne = (req, res) => {
  Kategori.findKategoriById(req.params.id_kategori, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id ${req.params.id_kategori}.',
          status : 404
        });
      } else {
        res.status(404).send({
          message: "error tidak ada data dengan id : " + req.params.id_kategori,
          status : 404
        });
      }
    } else res.send(data);
  });
};

//--------------------------------------------------------------------------------------
// controller buat dan simpan data
exports.create = (req, res) => {
  // validasi
  if (!req.body) {
    res.status(400).send({
      message: "form tidak boleh kosong!",
      status : 400
    });
  }
  // buatdata
  const kategori = new Kategori({
    id_kategori: req.body.id_kategori,
    nama_kategori : req.body.nama_kategori
    
  });
  // simpan data ke tabel 
  Kategori.create(kategori, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ada beberapa yang error.",
        status : 500
      });
    else res.send(data);
  });
};

//--------------------------------------------------------------------------------------
// controller update data
exports.update = (req, res) => {
  // validasi
  if (!req.body) {
    res.status(400).send({
      message: "form tidak boleh kosong!",
      status : 400
    });
  }
  //update per-id
  Kategori.updateById(
    req.params.id_kategori,
    new Kategori(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "tidak_ada") {
          res.status(404).send({
            message: 'tidak ada data dengan id ${req.params.id_kategori}.',
            status:404
          });
        } else {
          res.status(500).send({
            message: "tidak bisa update data dengan id : " + req.params.id_kategori,
            status : 500
          });
        }
      } else res.send(data);
    }
  );
};

//--------------------------------------------------------------------------------------
// controller hapus data per-id
exports.delete = (req, res) => {
  Kategori.remove(req.params.id_kategori, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id : ${req.params.id_kategori}.',
          status:404
        });
      } else {
        res.status(500).send({
          message: "tidak bisa hapus data dengan id :  " + req.params.id_kategori,
          status : 500
        });
      }
    } else res.send({ message: 'data terhapus!' });
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data dari tabel
exports.deleteAll = (req, res) => {
  Kategori.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ada beberapa yang error",
          status : 500
      });
    else res.send({ message: 'hapus semua data berhasil!' });
  });
}