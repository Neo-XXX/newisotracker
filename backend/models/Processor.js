import mongoose from 'mongoose';

const processorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isoSplit: Number,
  contact: String,
  phone: String,
  email: String,
  notes: String,
  leads: { type: Number, default: 0 },
  activeMerchants: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Processor', processorSchema);
