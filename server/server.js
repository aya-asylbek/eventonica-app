import express, { json } from 'express'; //Backend framework
import cors from 'cors';//To allow frontend requests
import { config } from 'dotenv';
import pool from './db.js'; // Import the database connection pool (from db.js)

config();//When you call config(), it reads the .env file and adds all the variables defined in it to the process.env object. 
console.log("DB_USER:", process.env.DB_USER); // Should print your database user

//import { EVENTS } from './events.js';//to get data locally from my sample file events.js and test in postman 



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); //Enables CORS, which allows your frontend to make requests to your backend 
app.use(express.json()); //middleware automatically parses incoming JSON request bodies.

//route for the home page
app.get('/', (req, res) => {
  res.send('Hello from Eventonica Server!');
});



//To get data with Postgres
 app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

 //(get event by id -locally )
 //app.get('/event/:id', (req, res) => {
    //const eventId = parseInt(req.params.id, 10); // Convert the event ID to a number
    //const event = EVENTS.find(e => e.id === eventId); // Find the event by ID
  
    //if (!event) {
      //return res.status(404).json({ message: "Event not found" }); // If no event is found, return a 404 error
    //}
  
    //res.json(event); // If the event is found, return it as JSON
  //});

  
//This starts the server and listens on the specified port,
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Route to get all events locally with no postgres from my sample file events.js
 //app.get('/events', (req, res) => {
 //res.json(EVENTS);  // Send imported data as JSON response
 //});