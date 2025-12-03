const { MongoClient } = require('mongodb');
const URI = "mongodb://localhost:27017/";

const databaseName = "ComSci";
const collectionName = "CS2A";

async function MongoOperations() {

    const client = new MongoClient(URI);

    try {

        await client.connect();
        console.log("MongoDB Database connected!");
        
        const database = client.db(databaseName);
        const studentCollection = database.collection(collectionName);

        console.log("Successfully loaded", collectionName, "from", databaseName);
        
        
        const student1 = {

            name : "Peter Andrew Bañares",
            age : 19,
            studentNo : "2024-01-05444",
            gwa : 2.9
        };

        const student2 = {

            name : "Gebhel Anselm Santos",
            age : 19,
            studentNo : "2024-01-02134",
            gwa : 1.0
        };

        /*let insertResult;
        insertResult = await studentCollection.insertOne(student1);
        console.log("Successfully inserted", student1.name);
        
        insertResult = await studentCollection.insertOne(student2);
        console.log("Successfully inserted", student2.name);
        */

        let students = [student1, student2];
        insertResult = await studentCollection.insertMany(students);

        let findResult;

        //FIND ONE
        //findResult = await studentCollection.findOne({name : "Gebhel Anselm Santos"});

        //if (!findResult) console.log("Student not found");
        
        //else console.log(findResult);
        
        //FIND MANY
        //results = await studentCollection.find( {age : 19} ).toArray();
        //console.log(results);
    
        //results = await studentCollection.find( {gwa : {$lt : 2.0}}).toArray();
        //console.log(results);

        //FIND ALL 
        //results = await studentCollection.find({}).toArray();
        //console.log(results);

        let updateResults;

        updateResults = await studentCollection.updateOne({name : "Gebhel Anselm Santos"}, { $set : {name : "Carl Muñoz"}});
        console.log(updateResults);

        //updateResults = await studentCollection.updateMany({gwa : 3.0}, { $set : {gwa : 1.1}});
        //console.log(updateResults);

        let deleteResult;

        deleteResult = await studentCollection.deleteOne({name : "Carl Muñoz"});
        console.log(deleteResult);


    }
    catch(error) {

        console.log("Error ", error);
    }

    finally {
        client.close();
    }

}

MongoOperations();