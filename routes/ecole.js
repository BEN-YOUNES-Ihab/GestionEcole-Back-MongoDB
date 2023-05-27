const express = require("express");
const {
  addEcole,
  getEcoles,
  getEcole,
  updateEcole,
  deleteEcole
} = require("../controllers/ecole-controller");
const router = express.Router();

router.post("/addEcole", addEcole);
router.get("/getEcoles",  getEcoles);
router.get("/getEcole/:id",  getEcole);
router.put('/updateEcole/:id', updateEcole);
router.delete("/deleteEcole/:id", deleteEcole);

module.exports = router;
