'use server';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `${process.env.NEXT_PUBLIC_DB_FIRST_URI}${process.env.NEXT_PUBLIC_DB_PASSWORD}${process.env.NEXT_PUBLIC_DB_LAST_URI}`;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let client: any;
let clientPromise: any;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the MongoClient is not re-created every time
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // In production mode, avoid using a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
