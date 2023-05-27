const { ObjectID } = require("bson");
const { getDb } = require("../db/connect");
const { Ecole  } = require("../models/ecole");


const addEcole = async (req, res) => {
  try {
    let ecole = new Ecole(
      nom = req.body.nom,
      adresse = req.body.adresse
    );
    const dbEcoles = getDb().collection("ecoles");
    let result = dbEcoles.insertOne(ecole);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const getEcoles = async (req, res) => {
    try {
      const dbEcoles = getDb().collection("ecoles");
      const keyword = req.query.keyword; 
  
      let query = {}; 
      if (keyword) {
        query = { nom: { $regex: keyword, $options: "i" } };
      }
  
      let result = await dbEcoles.find(query).sort({ nom: 1 }).toArray();
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(204).json({ msg: "No ecoles found" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  };


const getEcole = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    const dbEcoles = getDb().collection("ecoles");
    let result = await dbEcoles.find({ _id: id }).toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "this ecoles does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const updateEcole = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let nom = req.body.nom;
    let adresse = req.body.adresse;
    const dbEcoles = getDb().collection("ecoles");
    let result = await dbEcoles.updateOne({ _id: id }, { $set: { nom, adresse } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Updated succefuly" });
    } else {
      res.status(404).json({ msg: "this ecole does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const deleteEcole = async (req, res) => {
  try {
    const id = new ObjectID(req.params.id);
    const dbEcoles = getDb().collection("ecoles");
    const dbClasses = getDb().collection("classes");
    const deleteEcoleResult = await dbEcoles.deleteOne({ _id: id });
    if (deleteEcoleResult.deletedCount !== 1) {
      return res.status(404).json({ msg: "This ecole does not exist" });
    }
    const deleteClassesResult = await dbClasses.deleteMany({ ecoleId: req.params.id });
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};


module.exports = {
  addEcole,
  getEcoles,
  getEcole,
  updateEcole,
  deleteEcole
};