const sql = require("./db.js");
//--------------------------------------------------------------------------------------
// buat construktor
const Kota = function(kota) {
    this.id_kota = kota.id_kota;
    this.nama_kota = kota.nama_kota;
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Kota.getAllKota = result => {
    sql.query("SELECT * FROM kota", (err, res) => {
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
//model menampilkan data per idp
Kota.findKotaById = (id_kota, result) => {
  sql.query(`SELECT * FROM kota WHERE id_kota = ${id_kota}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("data kota: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "tidak ada data" }, null);
  });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Kota.create = (newKota, result) => {
  sql.query("INSERT INTO kota SET ?", newKota, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("berhasil : ", { id_kota: res.insertid_kota, ...newKota});
    result(null, { id_kota: res.insertid_kota, ...newKota });
  });
};

//--------------------------------------------------------------------------------------
// model update data
Kota.updateById = (id_kota, kota, result) => {
  sql.query(
    "UPDATE kota SET nama_kota = ? WHERE id_kota= ?",
    [kota.nama_kota, id_kota],
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
      console.log("update data.. : ", { id_kota: id_kota, ...kota });
      result(null, { id_kota: id_kota, ...kota });
    }
  );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Kota.remove = (id_kota, result) => {
  sql.query("DELETE FROM kota WHERE id_kota = ?", id_kota, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "tidak ada data" }, null);
      return;
    }
    console.log("terhapus data id_kota : ", id_kota);
    result(null, res);
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Kota.removeAll = result => {
  sql.query("DELETE FROM kota", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log('terhapus ${res.affectedRows} kota');
    result(null, res);
  });
};

  module.exports = Kota;