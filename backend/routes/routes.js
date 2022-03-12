
module.exports = app => {
    const kota = require("../controllers/kota.controller");

    app.get("/kota", kota.findAll); //temukan semua data kota
    app.get("/kota/:id_kota", kota.findOne); //temukan data kota per id
    app.post("/kota", kota.create); //insert data kota
    app.put("/kota/:id_kota", kota.update); // update per id
    app.delete("/kota/:id_kota", kota.delete); //hapus per id
    app.delete("/kota", kota.deleteAll); //hapus semua data

    const kategori= require("../controllers/kategori.controller");

    app.get("/kategori", kategori.findAll); //temukan semua data 
    app.get("/kategori/:id_kategori", kategori.findOne); //temukan data per id
    app.post("/kategori", kategori.create); //insert data 
    app.put("/kategori/:id_kategori", kategori.update); // update per id
    app.delete("/kategori/:id_kategori", kategori.delete); //hapus per id
    app.delete("/kategori", kategori.deleteAll); //hapus semua data


    const produk= require("../controllers/produk.controller");

    app.get("/produk", produk.findAll); //temukan semua data 
    app.get("/produk/:id_produk", produk.findOne); //temukan data per id
    app.post("/produk", produk.create); //insert data 
    app.put("/produk/:id_produk", produk.update); // update per id
    app.delete("/produk/:id_produk", produk.delete); //hapus per id
    app.delete("/produk", produk.deleteAll); //hapus semua data

    const distributor= require("../controllers/distributor.controller");

    app.get("/distributor", distributor.findAll); //temukan semua data 
    app.get("/distributor/:id_distributor", distributor.findOne); //temukan data per id
    app.post("/distributor", distributor.create); //insert data 
    app.put("/distributor/:id_distributor", distributor.update); // update per id
    app.delete("/distributor/:id_distributor", distributor.delete); //hapus per id
    app.delete("/distributor", distributor.deleteAll); //hapus semua data

  };