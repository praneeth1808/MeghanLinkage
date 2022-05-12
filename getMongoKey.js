var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://rootUser:VKT8tPxcjSacfRH8@cluster0.aki8a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function getKey(keyID) {
  try {
    await client.connect();

    var KB = await client.db("keys");
    const KB_col = KB.collection("keys_Collection");

    const cursor = KB_col.find(
      { keyID: keyID },
      {
        sort: { page: -1 },
        limit: 1,
      }
    );
    var results = [];
    await cursor.forEach((each) => results.push(each));
    return results;
  } finally {
    await client.close();
  }
}

module.exports = getKey;
