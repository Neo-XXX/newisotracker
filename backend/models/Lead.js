import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  source: String,
  notes: String,
  agent: String,
  status: { type: String, default: 'new' }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
