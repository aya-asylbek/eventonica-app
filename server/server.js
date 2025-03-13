import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

// home route
app.get('/', (req, res) => {
  res.send('Hello from Eventonica Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
