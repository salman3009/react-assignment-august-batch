
const mongoClient = require('mongodb').MongoClient;
// const uri = "mongodb://localhost:27017/"
const uri = "mongodb+srv://newton:nXN3TJ0SrJpmSChq@milesweb.xqz5h.mongodb.net/augustNewton";
const connect = new mongoClient(uri);
const db = connect.db('augustNewton');
const objectId = require('mongodb').ObjectId;

async function insert()
{
    try{
        let result = await db.collection('employee').insertOne({firstName:"akash",age:56});
        console.log(result);
    }catch(err){
      console.log(err);
    }

}
insert();

async function find(){
    try{
        let result = await db.collection('employee').find().toArray();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// find();


async function query(){
    try{
        // let query ={firstName:"akash",age:36}
        let query ={_id: new objectId('6446a4804f20759a64d3a2be')}
        let result = await db.collection('employee').find(query).toArray();
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
// query();

async function update(){
    try{
        let filter = {firstName:"akash"};
        let update ={$set:{age:25}};
        let result = await db.collection('employee').updateOne(filter,update);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }  
}
// update();

async function deleteQuery(){
    try{
        let filter ={_id: new objectId('6446a4804f20759a64d3a2be')};
        let result = await db.collection('employee').deleteOne(filter);
        console.log(result);
    }
    catch(err){
        console.log(err)
    }
}

// deleteQuery();

