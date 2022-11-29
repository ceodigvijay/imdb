import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default function database(req, res, next) {
  if (!client) {
    return client.connect().then(() => {
      req.dbClient = client;
      req.db = client.db("sample_mflix");
      return next();
    });
  }
  req.dbClient = client;
  req.db = client.db("sample_mflix");
  return next();
}
