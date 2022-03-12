//load paket express
const express = require("express");
//load body-parser
const bodyParser = require("body-parser");
const app = express();
//-------------------------------------------------------------------------
 
// parse permintaan jenis konten - application / json
app.use(bodyParser.json());
// parse permintaan jenis konten - application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
//-------------------------------------------------------------------------
// route awalan yaitu index
app.get("/", (req, res) => {
  res.json({ message: "Rest API Friska" });
});

//tambahan routes
require("./routes/routes")(app);
 
//-------------------------------------------------------------------------
 
// port untuk server lokal
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada Port : ${PORT}.`);
});