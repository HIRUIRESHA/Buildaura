import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { handleClerkWebhook } from './controllers/webhooks.js'; 

const app = express();

// Connect to database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for normal JSON requests

// Test route
app.get('/', (req, res) => res.send("APT Working"));

// Clerk webhook route (needs raw body for signature verification)
import bodyParser from 'body-parser';
app.post(
  '/clerk',
  bodyParser.raw({ type: 'application/json' }), // important for Svix
  handleClerkWebhook
);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
