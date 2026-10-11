import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error('Add your Mongo URI to .env.local as "MONGODB_URL"');
}

const uri = process.env.MONGODB_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the MongoClient instance
  // survives Next.js hot-reloads instead of reconnecting on every edit.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, don't use a global variable — create a fresh client.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;