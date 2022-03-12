const Produk = require("../models/produk.model");
//--------------------------------------------------------------------------------------
// controller temukan semua data
exports.findAll = (req, res) => {
    Produk.getAllProduk((err, data) => {
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
  Produk.findProdukById(req.params.id_produk, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id ${req.params.id_produk}.',
          status : 404
        });
      } else {
        res.status(404).send({
          message: "error tidak ada data dengan id : " + req.params.id_produk,
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
  const produk = new Produk({
    id_produk: req.body.id_produk,
    nama_produk : req.body.nama_produk,
    harga : req.body.harga,
    id_distributor : req.body.id_distributor,
    id_kategori : req.body.id_kategori
  });
  // simpan data ke tabel 
  Produk.create(produk, (err, data) => {
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
  Produk.updateById(
    req.params.id_produk,
    new Produk(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "tidak_ada") {
          res.status(404).send({
            message: 'tidak ada data dengan id ${req.params.id_produk}.',
            status:404
          });
        } else {
          res.status(500).send({
            message: "tidak bisa update data dengan id : " + req.params.id_produk,
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
  Produk.remove(req.params.id_produk, (err, data) => {
    if (err) {
      if (err.kind === "tidak_ada") {
        res.status(404).send({
          message: 'tidak ada data dengan id : ${req.params.id_produk}.',
          status:404
        });
      } else {
        res.status(500).send({
          message: "tidak bisa hapus data dengan id :  " + req.params.id_produk,
          status : 500
        });
      }
    } else res.send({ message: 'data terhapus!' });
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data dari tabel
exports.deleteAll = (req, res) => {
  Produk.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "ada beberapa yang error",
          status : 500
      });
    else res.send({ message: 'hapus semua data berhasil!' });
  });
}