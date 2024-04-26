import {MongoClient} from 'mongodb'

let cachedClient :any= null;
let cachedDb :any = null;

async function connectToDatabase(uri: any) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db();

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
