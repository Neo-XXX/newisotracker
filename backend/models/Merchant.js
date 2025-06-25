import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  mid: String,
  mcc: String,
  mtdVolume: Number,
  processor: String,
  status: String,
  agent: String,
  residualSplit: Number,
  nmiApiKey: String,
  transactionFee: Number,
  authorizationFee: Number,
  pricingModel: {
    type: String,
    enum: ['Flat Rate', 'Interchange Plus', 'Tiered']
  },
  residuals: Number,
  chargebacks: Number
}, { timestamps: true });

export default mongoose.model('Merchant', merchantSchema);
