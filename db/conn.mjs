import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

// The MongoClient is the object that references the connection to our
// datastore (Atlas, for example)
const client = new MongoClient(connectionString, { serverApi: ServerApiVersion.v1 });

// The connect() method does not attempt a connection; instead it instructs
// the driver to connect using the settings provided when a connection
// is required.
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

// Provide the name of the database.
// If the database does not exist, the driver and Atlas
// will create them automatically when you first write data.
const dbName = "ChangeX";

// Create references to the database in order to run
// operations on them.
const db = conn.db(dbName);
db.users = db.collection("users");
db.transactions = db.collection("transactions");
db.budgets = db.collection("budgets");
db.posts = db.collection("posts");
db.replies = db.collection("replies");

export default db;