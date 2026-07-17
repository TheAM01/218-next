import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;

if (!uri) {
    throw new Error("MONGO_URI not defined");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise;

export default clientPromise;