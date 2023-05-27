const express = require("express");
const {
    addClasseByEcoleId,
  getClasses,
  getClasse,
  updateClasse,
  deleteClasse
} = require("../controllers/classe-controller");
const router = express.Router();

router.post("/addClasseByEcoleId/:id", addClasseByEcoleId);
router.get("/getClasses",  getClasses);
router.get("/getClasse/:id",  getClasse);
router.put('/updateClasse/:id', updateClasse);
router.delete("/deleteClasse/:id", deleteClasse);

module.exports = router;
