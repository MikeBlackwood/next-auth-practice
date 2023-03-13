import {MongoClient} from "mongodb";

async function connectToDB() {
    const client = await MongoClient.connect(process.env.URL);
    return client;
}
export default connectToDB;