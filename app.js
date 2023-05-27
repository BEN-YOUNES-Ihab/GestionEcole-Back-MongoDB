require('dotenv').config();
const express = require("express");
const cors = require('cors');
const dbo = require("./db/connect");

const app = express();
 
const PORT = process.env.PORT;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/// ROUTES START ///////
const ecoleRoutes = require('./routes/ecole');
const classeRoutes = require('./routes/classe');

app.use('/ecole', ecoleRoutes);
app.use('/classes', classeRoutes);

//// ROUTES END /////////


//CONNECT TO DB
dbo.connectToDB((err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    app.listen(PORT, () => {
      console.log(`Node.js App running on port ${PORT}...`);
  })   
  }
});



