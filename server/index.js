const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const packagesRoutes = require('./routes/packages');
const enquiriesRoutes = require('./routes/enquiries');
const contactRoutes = require('./routes/contact');
const packageEnquiriesRoutes = require('./routes/packageEnquiries');
const uploadRoutes = require('./routes/upload');
const trendingDestinationsRoutes = require('./routes/trendingDestinations');
const dreamDestinationsRoutes = require('./routes/dreamDestinations');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://globalconnectworldtravel.com',
  'https://www.globalconnectworldtravel.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded images as static files with cache headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '30d',
  immutable: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/package-enquiries', packageEnquiriesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/trending-destinations', trendingDestinationsRoutes);
app.use('/api/dream-destinations', dreamDestinationsRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Travel API is running.' }));

app.listen(PORT, () => {
  console.log(`✅ Travel API server running at http://localhost:${PORT}`);
  console.log(`   MySQL DB: ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});
