const { MongoClient } = require('mongodb');


const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.xbkot.mongodb.net/myblog?retryWrites=true&w=majority`


const withDB = async (operations, response) => {
    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db();
        await operations(db);
        client.close();

    }catch(err) {
        response.status(500).json({ message: 'Error connecting to db', err });
    }
}


module.exports = {withDB};