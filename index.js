import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import resourceRoutes from './routes/resourceRoutes.js';
import childRoutes from './routes/childRoutes.js';
import adoptionRoutes from './routes/adoptionRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 
import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Serve Static Files (for Uploaded Files)
app.use('/uploads', express.static('uploads'));

// Connect to Database
connectDB();

// Routes
app.use('/resources', resourceRoutes);
app.use('/api/children', childRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/admin', adminRoutes); // ✅ Added Admin Routes

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
