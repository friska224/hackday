//load paket express
const express = require("express");
const mysql = require("mysql");
//load body-parser
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const saltRound = 10;

const app = express();
//-------------------------------------------------------------------------
 
// parse permintaan jenis konten - application / json
app.use(bodyParser.json());
// parse permintaan jenis konten - application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
 cors({
     origin: ["http://localhost:3000"],
      //methods: ['GET', 'POST'],
      credentials: true,
 })
);

app.use (
  session ({
      key: "userId",
      secret: "inirahasia",
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60 * 60 * 24,
      },
  })
);
//-------------------------------------------------------------------------
// route awalan yaitu index
app.get("/", (req, res) => {
  res.json({ message: "Rest API Friska" });
});

//tambahan routes
require("./routes/routes")(app);
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "kelola_produk",
});
//-------------------------------------------------------------------------
var loggedIn = false;

app.get("/login", (req, res) => {
  if (req.session.user) {
    loggedIn = true;
    res.status(200).send({ loggedIn: true, user: req.session.user });
  } else {
    loggedIn = false;
    res.status(403).send({ loggedIn: false });
  }
});

app.get('/logout',(req,res) => {
  req.session.destroy();
    loggedIn = false;
    res.send("logout");
   // res.redirect('/');
});

app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 var session;
 
 db.query(
  "SELECT * FROM user WHERE username = ? AND password = ?",
  [username, password], 
        (err, result)=> {

          if (err) {
            console.log(res.statusCode)
            res.status(401).send({err: err});
          }
          if (result == 0) {
            console.log(res.statusCode)
                res.status(401).send({ message: "User doesn't exists"});
          }
          req.session.user = result;
          console.log("status", res.statusCode)
          if(res.statusCode == 200){
            loggedIn = true;
          session=req.session;
          session.user=req.body.username;
          }
          res.status(200).send({ loggedIn: true, user: req.session.user });
          console.log("pesan server",req.session.user, loggedIn);
          //res.status(400).send({message: "Wrong username/ password comination!"}); 

           /* if (err) {
                console.log(res.statusCode)
                res.status(401).send({err: err});
            }
            if (result.length = 0) {

              console.log(res.statusCode)
                res.status(404).send({ message: "User doesn't exists"});
                           
            } else {
              req.session.user = result;
                        console.log("status", res.statusCode)
                        res.status(200).send({ loggedIn: true, user: req.session.user });
                        console.log("pesan server",req.session.user, loggedIn);
                        //res.status(400).send({message: "Wrong username/ password comination!"}); 
            }*/
        }
    );
});


app.post('/register', (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;
      db.query( 
          "INSERT INTO user (username, password) VALUES (?,?)",
          [username, hash], 
          (err, result)=> {
              console.log(err);
          }
      );
});







// port untuk server lokal
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada Port : ${PORT}.`);
});