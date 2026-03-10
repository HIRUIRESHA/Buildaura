import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { verifyWebhook } from '@clerk/backend/webhooks';
import { Buffer } from 'node:buffer';

// Routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import companycartRoutes from './routes/companycartRoutes.js';
import projectcartRoutes from './routes/projectcartRoutes.js';
import clientRoutes from "./routes/clients.js";

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Clerk Webhook Route
app.post('/webhooks/clerk', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    const signature = req.headers['webhook-signature'];

    if (!webhookSecret || !signature) {
      throw new Error('Webhook secret or signature missing');
    }

    const event = verifyWebhook({
      payload: req.body,      
      secret: webhookSecret,  
      header: signature,
    });

    console.log('Clerk Webhook Event:', event);

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Clerk webhook error:', err);
    res.status(400).json({ error: 'Invalid webhook' });
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/companycarts', companycartRoutes);
app.use('/api/projectcart', projectcartRoutes);
app.use('/api/clients', clientRoutes);

// Test route
app.get('/', (req, res) => res.send('API Working'));

// 404 
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
