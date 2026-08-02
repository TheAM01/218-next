import dns from "dns";

// MongoDB Atlas uses mongodb+srv:// which requires SRV/TXT DNS lookups.
// Some local/ISP resolvers fail these, causing ECONNREFUSED — force public DNS.
dns.setServers(["1.1.1.1", "8.8.8.8"]);
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