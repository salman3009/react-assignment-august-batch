
const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/"
const connect = new mongoClient(uri);
const db = connect.db('augustNewton');

async function insert()
{
    try{
        let result = await db.collection('employee').insertOne({status:true});
        console.log(result);
    }catch(err){
      console.log(err);
    }

}
// insert();

async function find(){
    try{
        let result = await db.collection('employee').find().toArray();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
find();