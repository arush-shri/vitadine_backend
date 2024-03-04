
var url = "mongodb+srv://shriarush:codeCraft@codecraft.cl3cio5.mongodb.net/?retryWrites=true&w=majority";       // TO CHANGE TO ORIGINAL URL
const { MongoClient } = require('mongodb');
const client = new MongoClient(url);
const database = client.db("khana")

client.connect()
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = {
    database
};