import mongoose from 'mongoose';

const processorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isoSplit: Number,
  contact: String,
  phone: String,
  email: String,
  notes: String
}, { timestamps: true });

export default mongoose.model('Processor', processorSchema);
