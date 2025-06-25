import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  source: String,
  notes: String,
  agent: String,
  revenueYearly: Number,
  importance: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['document upload', 'application', 'pending', 'cancelled', 'approved'],
    default: 'document upload'
  },
  processor: String,
  docsUploaded: { type: Boolean, default: false },
  applicationSigned: { type: Boolean, default: false },
  underwritingStatus: String,
  varSheetUploaded: { type: Boolean, default: false },
  nmiApiKey: String,
  transactionFee: Number,
  authorizationFee: Number,
  pricingModel: {
    type: String,
    enum: ['Flat Rate', 'Interchange Plus', 'Tiered']
  },
  transacting: { type: Boolean, default: false },
  residualsUploaded: { type: Boolean, default: false },
  residualAuditStatus: String,
  chargebacks: Number,
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
