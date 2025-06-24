import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import leadRoutes from './routes/leads.js';
import merchantRoutes from './routes/merchants.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadRoutes);
app.use('/api/merchants', merchantRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ISO Tracker API' });
});

const start = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/isotracker';
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
