const Kota = require("../models/kota.model");
//--------------------------------------------------------------------------------------
// controller temukan semua data
exports.findAll = (req, res) => {
    Kota.getAllKota((err, data) => {
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
  Kota.findKotaById(req.params.id_kota, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id ${req.params.id_kota}.',
          status : 404
        });
      } else {
        res.status(404).send({
          message: "error tidak ada data dengan id : " + req.params.id_kota,
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
  const kota = new Kota({
    id_kota: req.body.id_kota,
    nama_kota : req.body.nama_kota
    
  });
  // simpan data ke tabel 
  Kota.create(kota, (err, data) => {
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
  Kota.updateById(
    req.params.id_kota,
    new Kota(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "tidak_ada") {
          res.status(404).send({
            message: 'tidak ada data dengan id ${req.params.id_kota}.',
            status:404
          });
        } else {
          res.status(500).send({
            message: "tidak bisa update data dengan id : " + req.params.id_kota,
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
  Kota.remove(req.params.id_kota, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id : ${req.params.id_kota}.',
          status:404
        });
      } else {
        res.status(500).send({
          message: "tidak bisa hapus data dengan id :  " + req.params.id_kota,
          status : 500
        });
      }
    } else res.send({ message: 'data terhapus!' });
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data dari tabel
exports.deleteAll = (req, res) => {
  Kota.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ada beberapa yang error",
          status : 500
      });
    else res.send({ message: 'hapus semua data berhasil!' });
  });
}