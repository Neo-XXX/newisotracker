import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import leadRoutes from './routes/leads.js';
import merchantRoutes from './routes/merchants.js';
import processorRoutes from './routes/processors.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/leads', leadRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/processors', processorRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve index.html for any other non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://iso_user:iso_pass123@isoapp.i6ozni3.mongodb.net/?retryWrites=true&w=majority&appName=isoapp';

app.locals.useMemoryDB = true;
app.locals.memoryLeads = [];
app.locals.memoryMerchants = [];
app.locals.memoryProcessors = [];

async function connectAndStart() {
  if (MONGO_URI && !MONGO_URI.includes('<db_password>')) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      app.locals.useMemoryDB = false;
    } catch (err) {
      console.error(
        'Failed to connect to MongoDB, using in-memory store:',
        err.message
      );
    }
  } else {
    console.log('No valid MongoDB connection string provided. Using in-memory store.');
  }

  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

await connectAndStart();

export default app;
