const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { IDatabase } = require("./AdapterDatabase");
const ConfigService = require("./ConfigService");

const config = new ConfigService();

const getClient = () => {
  const user = config.get("database.user");
  const password = config.get("database.password");
  const host = config.get("database.host");
  const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
};

class MongoService extends IDatabase {
  constructor() {
    super();
  }

  async create(collectionName, payload) {
    const client = getClient();
    try {
      await client.connect();
      const dbName = config.get("database.name");
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      const row = await collection.insertOne(payload);
      return row;
    } catch (error) {
      throw { success: false, message: "Error Mongo service" };
    } finally {
      await client.close();
    }
  }
}

module.exports = {MongoService}