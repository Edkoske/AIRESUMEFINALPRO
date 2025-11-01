const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your Vite dev server port
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Make sure path matches your route file
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/portfolio', require('./routes/portfolio'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
