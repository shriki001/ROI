const { MongoClient } = require("mongodb");
const dbURI = "mongodb://mongo:27017";
(async (_) => {
  const client = new MongoClient(dbURI);
  const db = client.db("ROI");
  global.db = db;
})();
