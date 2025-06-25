import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Merchant from './models/Merchant.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function run() {
  if (!MONGO_URI || MONGO_URI.includes('<db_password>')) {
    console.error('Please set a valid MONGO_URI in your environment.');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let merchant = await Merchant.findOne({ name: 't', email: 't' });
  if (!merchant) {
    merchant = new Merchant({ name: 't', email: 't' });
    await merchant.save();
    console.log('Inserted sample merchant:', merchant);
  } else {
    console.log('Merchant already exists:', merchant);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Error running seed script:', err);
  mongoose.disconnect();
});
