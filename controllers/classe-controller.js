const { ObjectID } = require("bson");
const { getDb } = require("../db/connect");
const { Classe  } = require("../models/classe");


const addClasse = async (req, res) => {
    console.log(req.body);
  try {
    let classe = new Classe(
      nom = req.body.nom,
      nbreleve = req.body.nbreleve
    );
    const dbClasses = getDb().collection("classes");
    let result = dbClasses.insertOne(classe);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const addClasseByEcoleId = async (req, res) => {
      try {
        let classe = new Classe(
          ecoleId =  req.params.id,
          nom = req.body.nom,
          nbreleve = req.body.nbreleve
        );
        const dbClasses = getDb().collection("classes");
        let result = dbClasses.insertOne(classe);
    
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(501).json(error);
      }
  };

  const getClasses = async (req, res) => {
    try {
      const dbClasses = getDb().collection("classes");
      const ecoleId = req.query.ecole_id;
      const keyword = req.query.nom;
      const page = (parseInt(req.query.page) + 1) || 1;
      const size = parseInt(req.query.size) || 10;
  
      let query = { ecoleId: ecoleId };
      if (keyword) {
        query.nom = { $regex: keyword, $options: "i" };
      }
  
      const totalCount = await dbClasses.countDocuments(query);
  
      let result = await dbClasses
        .find(query)
        .sort({ nom: 1 })
        .skip((page - 1) * size)
        .limit(size)
        .toArray();
  
      if (result.length > 0) {
        res.status(200).json({
          content: result,
          totalElements: totalCount,
          totalPages: Math.ceil(totalCount / size),
          currentPage: page,
          pageSize: size,
        });
      } else {
        res.status(204).json({ msg: "No classes found" });
      }
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  };


const getClasse = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    const dbClasses = getDb().collection("classes");
    let result = await dbClasses.find({ _id: id }).toArray();
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ msg: "this classes does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const updateClasse = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let nom = req.body.nom;
    let nbreleve = req.body.nbreleve;
    const dbClasses = getDb().collection("classes");
    let result = await dbClasses.updateOne({ _id: id }, { $set: { nom, nbreleve } });

    if (result.modifiedCount === 1) {
      res.status(200).json({ msg: "Updated succefuly" });
    } else {
      res.status(404).json({ msg: "this classe does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
};

const deleteClasse = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    const dbClasses = getDb().collection("classes");
    let result = await dbClasses.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "deleted succefuly" });
    } else {
      res.status(404).json({ msg: "this classe does not exist" });
    }
  } catch (error) {
    console.log(error);

    res.status(501).json(error);
  }
};


module.exports = {
  addClasseByEcoleId,
  getClasses,
  getClasse,
  updateClasse,
  deleteClasse
};