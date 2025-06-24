import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mid: String,
  mcc: String,
  mtdVolume: Number,
  processor: String,
  status: String,
  agent: String,
  residualSplit: Number,
  nmiApiKey: String,
  residuals: Number,
  chargebacks: Number
}, { timestamps: true });

export default mongoose.model('Merchant', merchantSchema);
