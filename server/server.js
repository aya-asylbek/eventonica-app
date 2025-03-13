import express, { json } from 'express'; //Backend framework
import cors from 'cors';//To allow frontend requests
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); //Enables CORS, which allows your frontend to make requests to your backend 
app.use(express.json()); //middleware automatically parses incoming JSON request bodies.

//route for the home page
app.get('/', (req, res) => {
  res.send('Hello from Eventonica Server!');
});
//This starts the server and listens on the specified port,
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
