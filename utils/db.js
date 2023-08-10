import mongoose from "mongoose"
const connection = {}

const connectDb = async () => {
    if (connection.isConnected) {
        console.log("Already connected to Database");
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connection to the database");
            return;
        }
        await mongoose.disconnect;
    }
    const db = mongoose.connect(process.env.NEXT_APP_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("New Connection to the database");
    connection.isConnected = (await db).connections[0].readyState;
}

async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        }
        else {
            console.log("Not disconnecting from the database.");
        }
    }
}
const db = { connectDb, disconnectDb };
export default db;