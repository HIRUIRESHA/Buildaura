import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import companyRoutes from './routes/companyRoutes.js'; // Added company routes
import companycartRoutes from './routes/companycartRoutes.js';
import projectcartRoutes from './routes/projectcartRoutes.js';


const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse URL-encoded body if needed
app.use('/uploads', express.static('uploads')); // serve uploaded images

// API Routes
app.use('/api/users', userRoutes);         // user routes
app.use('/api/admin', adminRoutes);        // admin routes
app.use('/api/companies', companyRoutes);  // company routes (login, register, etc.)
app.use('/api/companycarts', companycartRoutes);  // company cart routes
app.use('/api/projectcart', projectcartRoutes);  // project cart routes

// Test route
app.get('/', (req, res) => res.send('API Working'));

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
