import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  source: String,
  notes: String,
  agent: String,
  status: {
    type: String,
    enum: ['document upload', 'application', 'pending', 'cancelled', 'approved'],
    default: 'document upload'
  },
  acquiringBank: String,
  docsUploaded: { type: Boolean, default: false },
  applicationSigned: { type: Boolean, default: false },
  underwritingStatus: String,
  varSheetUploaded: { type: Boolean, default: false },
  nmiApiKey: String,
  transacting: { type: Boolean, default: false },
  residualsUploaded: { type: Boolean, default: false },
  residualAuditStatus: String,
  chargebacks: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
