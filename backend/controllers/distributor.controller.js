const Distributor = require("../models/distributor.model");
//--------------------------------------------------------------------------------------
// controller temukan semua data
exports.findAll = (req, res) => {
    Distributor.getAllDistributor((err, data) => {
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
  Distributor.findDistributorById(req.params.id_distributor, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id ${req.params.id_distributor}.',
          status : 404
        });
      } else {
        res.status(404).send({
          message: "error tidak ada data dengan id : " + req.params.id_distributor,
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
  const distributor = new Distributor({
    id_distributor: req.body.id_distributor,
    nama_distributor : req.body.nama_distributor,
    alamat : req.body.alamat,
    id_kota : req.body.id_kota
    
  });
  // simpan data ke tabel 
  Distributor.create(distributor, (err, data) => {
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
  Distributor.updateById(
    req.params.id_distributor,
    new Distributor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "tidak_ada") {
          res.status(404).send({
            message: 'tidak ada data dengan id ${req.params.id_distributor}.',
            status:404
          });
        } else {
          res.status(500).send({
            message: "tidak bisa update data dengan id : " + req.params.id_distributor,
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
  Distributor.remove(req.params.id_distributor, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id : ${req.params.id_distributor}.',
          status:404
        });
      } else {
        res.status(500).send({
          message: "tidak bisa hapus data dengan id :  " + req.params.id_distributor,
          status : 500
        });
      }
    } else res.send({ message: 'data terhapus!' });
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data dari tabel
exports.deleteAll = (req, res) => {
  Distributor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ada beberapa yang error",
          status : 500
      });
    else res.send({ message: 'hapus semua data berhasil!' });
  });
}