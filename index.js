// IMPORTANT: Run 'npm install mongodb' before running this project
const { MongoClient } = require('mongodb');
const URI = "mongodb://localhost:27017";

const databaseName = "ComSci";
const collectionName = "CS2A";

async function mongoOperations() {
    // Create MongoDB client
    const client = new MongoClient(URI);

    try {
        // Connect to MongoDB server
        await client.connect();
        console.log("Connected!");

        // Access database and collection
        const database = client.db(databaseName);
        const studentCollection = database.collection(collectionName);

        console.log("Successfully loaded!");

        // Create student documents
        const student1 = {

            name : "Peter Bañares",
            age : 19,
            gwa : 2.0
        };

        const student2 = {

            name : "Carl Muñoz",
            age : 19,
            gwa : 1.1

        }

        const students = [student1, student2];

        // INSERT: Add a single student to collection
        let insertOneResult;
        
        insertOneResult = await studentCollection.insertOne(student1);
        console.log("Successfully inserted one student!");

        // INSERT: Add multiple students to collection
        let insertResult;

        insertResult = await studentCollection.insertMany(students);
        console.log("Successfully inserted a student!");

        // FIND: Query for a single student by name
        let findResult;

        findResult = await studentCollection.findOne({name : "Carl Muñoz"})
        console.log(findResult);

        // FIND: Query all students with GWA <= 2
        studentarray = await studentCollection.find({gwa : {$lte : 2}}).toArray();
        console.log(studentarray);

        // UPDATE: Change a single student's name
        let updateresult;

        updateresult = await studentCollection.updateOne({name : "Carl Muñoz"}, {$set : {name : "Gebhel Santos"}});
        console.log(updateresult);

        // UPDATE: Change GWA for all students with GWA <= 2
        let udpatedgwas;
        udpatedgwas = await studentCollection.updateMany({gwa : {$lte : 2}}, {$set : {gwa : 1.1}});
        console.log(udpatedgwas);

        // DELETE: Remove a single student by name
        let deleteresult;

        deleteresult = await studentCollection.deleteOne({name : "Gebhel Santos"});
        console.log(deleteresult);

        // DELETE: Remove all students with GWA >= 1.0
        deleteresult = await studentCollection.deleteMany({gwa : {$gte : 1.0}});
        console.log(deleteresult);

    }

    catch(error) {
        // Handle any errors
        console.log("Error ", error);
    }

    finally {
        // Close database connection
        client.close();
    }
}

// Execute the MongoDB operations
mongoOperations();