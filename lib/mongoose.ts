import mongoose from "mongoose";
import "../app/models/user";
import "../app/models/product";
import "../app/models/order";
import "../app/models/address";
// import "../app/models/promoCode";

const MONGODB_URI: string = process.env.MONGODB_URI as string; // Use environment variable for the connection string
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose as
  | {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    }
  | undefined;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
// At this point, cached is always defined
const cachedMongoose = cached!;

async function dbConnect(): Promise<typeof mongoose> {
  if (cachedMongoose.conn) {
    return cachedMongoose.conn;
  }
  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering
    };
    cachedMongoose.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cachedMongoose.conn = await cachedMongoose.promise;
  } catch (e) {
    cachedMongoose.promise = null;
    throw e;
  }
  return cachedMongoose.conn;
}
export default dbConnect;
