const sql = require("./db.js");
//--------------------------------------------------------------------------------------
// buat construktor
const Produk = function(produk) {
    this.id_produk = produk.id_produk;
    this.nama_produk = produk.nama_produk;
    this.harga = produk.harga;
    this.id_distributor = produk.id_distributor;
    this.id_kategori = produk.id_kategori;
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Produk.getAllProduk = result => {
    sql.query("SELECT id_produk, nama_produk, harga, produk.id_kategori, kategori.nama_kategori, produk.id_distributor, distributor.nama_distributor FROM produk,kategori,distributor WHERE produk.id_kategori= kategori.id_kategori and produk.id_distributor= distributor.id_distributor", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("kota : ", res);
      result(null, res);
    });
  };

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Produk.findProdukById = (id_produk, result) => {
  sql.query(`SELECT id_produk, nama_produk, harga, produk.id_kategori, kategori.nama_kategori, produk.id_distributor, distributor.nama_distributor FROM produk,kategori,distributor WHERE produk.id_kategori= kategori.id_kategori and produk.id_distributor= distributor.id_distributor and id_produk = ${id_produk}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("data produk: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "tidak ada data" }, null);
  });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Produk.create = (newProduk, result) => {
  sql.query("INSERT INTO produk SET ?", newProduk, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("berhasil : ", { id_produk: res.insertid_produk, ...newProduk});
    result(null, { id_produk: res.insertid_produk, ...newProduk });
  });
};

//--------------------------------------------------------------------------------------
// model update data
Produk.updateById = (id_produk, produk, result) => {
  sql.query(
    "UPDATE produk SET nama_produk = ?, harga = ?, id_distributor = ?, id_kategori = ? WHERE id_produk= ?",
    [produk.nama_produk, produk.harga, produk.id_distributor, produk.id_kategori, id_produk],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "tidak ada data" }, null);
        return;
      }
      console.log("update data.. : ", { id_produk: id_produk, ...produk });
      result(null, { id_produk: id_produk, ...produk });
    }
  );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Produk.remove = (id_produk, result) => {
  sql.query("DELETE FROM produk WHERE id_produk = ?", id_produk, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "tidak ada data" }, null);
      return;
    }
    console.log("terhapus data id_produk : ", id_produk);
    result(null, res);
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Produk.removeAll = result => {
  sql.query("DELETE FROM produk", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log('terhapus ${res.affectedRows} produk');
    result(null, res);
  });
};

  module.exports = Produk;