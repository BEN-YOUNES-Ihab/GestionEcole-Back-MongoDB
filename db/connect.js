const {MongoClient} = require('mongodb');

const connectionString = process.env.MONGO_URL;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnect;

exports.connectToDB = async(callback) => {
    try {
        const db = await client.connect();
        dbConnect = db.db(process.env.DB_NAME);
        console.log("Successfully connected to MongoDB...");
        callback();
    } catch(err) {
    }
  }

exports.getDb = () => dbConnect;

