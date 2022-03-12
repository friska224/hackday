const sql = require("./db.js");
//--------------------------------------------------------------------------------------
// buat construktor
const Kategori = function(kategori) {
    this.id_kategori = kategori.id_kategori;
    this.nama_kategori = kategori.nama_kategori;
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Kategori.getAllKategori = result => {
    sql.query("SELECT * FROM kategori", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("kategori : ", res);
      result(null, res);
    });
  };

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Kategori.findKategoriById = (id_kategori, result) => {
  sql.query(`SELECT * FROM kategori WHERE id_kategori = ${id_kategori}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("data kategori: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "tidak ada data" }, null);
  });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Kategori.create = (newKategori, result) => {
  sql.query("INSERT INTO kategori SET ?", newKategori, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("berhasil : ", { id_kategori: res.insertid_kategori, ...newKategori});
    result(null, { id_kategori: res.insertid_kategori, ...newKategori });
  });
};

//--------------------------------------------------------------------------------------
// model update data
Kategori.updateById = (id_kategori, kategori, result) => {
  sql.query(
    "UPDATE kategori SET nama_kategori = ? WHERE id_kategori= ?",
    [kategori.nama_kategori, id_kategori],
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
      console.log("update data.. : ", { id_kategori: id_kategori, ...kategori });
      result(null, { id_kategori: id_kategori, ...kategori });
    }
  );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Kategori.remove = (id_kategori, result) => {
  sql.query("DELETE FROM kategori WHERE id_kategori = ?", id_kategori, (err, res) => {
    if (res.affectedRows == 0) {
      result({ kind: "tidak ada data" }, null);
      return;
    }
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("terhapus data id_kategori : ", id_kategori);
    result(null, res);
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Kategori.removeAll = result => {
  sql.query("DELETE FROM kategori", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log('terhapus ${res.affectedRows} kategori');
    result(null, res);
  });
};

  module.exports = Kategori;