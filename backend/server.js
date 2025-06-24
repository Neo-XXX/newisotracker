import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import leadRoutes from './routes/leads.js';
import merchantRoutes from './routes/merchants.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/leads', leadRoutes);
app.use('/api/merchants', merchantRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ISO Tracker API' });
});

const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI && !MONGO_URI.includes('<db_password>')) {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) =>
      console.error('Failed to connect to MongoDB:', err.message)
    );
} else {
  console.log('No valid MongoDB connection string provided. Skipping DB connection.');
}

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
