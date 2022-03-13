const sql = require("./db.js");
//--------------------------------------------------------------------------------------
// buat construktor
const Distributor = function(distributor) {
    this.id_distributor = distributor.id_distributor;
    this.nama_distributor = distributor.nama_distributor;
    this.alamat = distributor.alamat;
    this.id_kota = distributor.id_kota
    this.nama_kota = distributor.nama_kota
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Distributor.getAllDistributor = result => {
    sql.query("SELECT id_distributor, nama_distributor, alamat, distributor.id_kota, kota.nama_kota FROM distributor, kota WHERE distributor.id_kota = kota.id_kota; ", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("distributor : ", res);
      result(null, res);
    });
  };

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Distributor.findDistributorById = (id_distributor, result) => {
  sql.query(`SELECT id_distributor, nama_distributor, alamat, distributor.id_kota, kota.nama_kota FROM distributor, kota WHERE distributor.id_kota = kota.id_kota and id_distributor = ${id_distributor}`, (err, res) => {
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
Distributor.create = (newDistributor, result) => {
  sql.query("INSERT INTO distributor SET ?", newDistributor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("berhasil : ", { id_distributor: res.insertid_distributor, ...newDistributor});
    result(null, { id_distributor: res.insertid_distributor, ...newDistributor });
  });
};

//--------------------------------------------------------------------------------------
// model update data
Distributor.updateById = (id_distributor, distributor, result) => {
  sql.query(
    "UPDATE distributor SET nama_distributor = ?, alamat = ?, id_kota = ? WHERE id_distributor= ?",
    [distributor.nama_distributor, distributor.alamat, distributor.id_kota, id_distributor],
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
      console.log("update data.. : ", { id_distributor : id_distributor, ...distributor });
      result(null, { id_distributor: id_distributor, ...distributor });
    }
  );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Distributor.remove = (id_distributor, result) => {
  sql.query("DELETE FROM distributor WHERE id_distributor = ?", id_distributor, (err, res) => {
    if (res.affectedRows == 0) {
      result({ kind: "tidak ada data" }, null);
      return;
    }
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("terhapus data id_distributor : ", id_distributor);
    result(null, res);
  });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Distributor.removeAll = result => {
  sql.query("DELETE FROM distributor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log('terhapus ${res.affectedRows} distributor');
    result(null, res);
  });
};

  module.exports = Distributor;