import express, { json } from 'express'; //Backend framework
import cors from 'cors';//To allow frontend requests
import { config } from 'dotenv';
import pool from './db.js'; // Import the database connection pool (from db.js)

config();//When you call config(), it reads the .env file and adds all the variables defined in it to the process.env object. 

//import { EVENTS } from './events.js';//to get data locally from my sample file events.js and test in postman 



const app = express();
const PORT = 5000;


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


//post- add new one
app.post('/api/events', async (req, res) => {
  const { name, date, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (name, date, category) VALUES ($1, $2, $3) RETURNING *',
      [name, date, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// Edit an event (PUT)
app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, category } = req.body;
  
  try {
    const { rows } = await pool.query(
      'UPDATE events SET name = $1, date = $2, category = $3 WHERE id = $4 RETURNING *',
      [name, date, category, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
//delete my event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length > 0) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search for events by name and/or category
app.get('/api/events/search', async (req, res) => {
  const { name, category } = req.query;
  
  // At least one search parameter is required,maybe name or category 
  if (!name && !category) {
    return res.status(400).json({ message: "Please provide 'name' or 'category' to search" });
  }

  try {
    // Build dynamic query based on provided parameters
    let query = 'SELECT * FROM events WHERE ';
    const params = [];
    const conditions = [];

    if (name) {
      conditions.push(`name ILIKE $${params.length + 1}`);
      params.push(`%${name}%`);
    }

    if (category) {
      conditions.push(`category ILIKE $${params.length + 1}`);
      params.push(`%${category}%`);
    }

    query += conditions.join(' AND ');

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get event by ID ( use 'pool')
app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Route to get all events locally with no postgres from my sample file events.js
 //app.get('/events', (req, res) => {
 //res.json(EVENTS);  // Send imported data as JSON response
 //});


 //(get event by id -locally )
 //app.get('/event/:id', (req, res) => {
    //const eventId = parseInt(req.params.id, 10); // Convert the event ID to a number
    //const event = EVENTS.find(e => e.id === eventId); // Find the event by ID
  
    //if (!event) {
      //return res.status(404).json({ message: "Event not found" }); // If no event is found, return a 404 error
    //}
  
    //res.json(event); // If the event is found, return it as JSON
  //});