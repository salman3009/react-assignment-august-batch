
const mongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/"
const connect = new mongoClient(uri);
const db = connect.db('augustNewton');

async function insert()
{
    try{
        let result = await db.collection('employee').insertOne({firstName:"akhil",age:44,salary:10000,status:true});
        console.log(result);
    }catch(err){
      console.log(err);
    }

}
insert();