import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import Merchant from '../models/Merchant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    res.json(req.app.locals.memoryLeads);
  } else {
    const leads = await Lead.find();
    res.json(leads);
  }
});

router.post('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    const lead = { _id: new mongoose.Types.ObjectId().toString(), ...req.body };
    req.app.locals.memoryLeads.push(lead);
    if (lead.approved) {
      const exists = req.app.locals.memoryMerchants.find(
        m => m.name === lead.name && m.email === lead.email
      );
      if (!exists) {
        const merchant = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: lead.name,
          email: lead.email,
          agent: lead.agent,
          processor: lead.processor,
          nmiApiKey: lead.nmiApiKey,
          transactionFee: lead.transactionFee,
          authorizationFee: lead.authorizationFee,
          pricingModel: lead.pricingModel
        };
        req.app.locals.memoryMerchants.push(merchant);
      }
    }
    res.json(lead);
  } else {
    const lead = new Lead(req.body);
    await lead.save();
    if (lead.approved) {
      const exists = await Merchant.findOne({
        name: lead.name,
        email: lead.email
      });
      if (!exists) {
        const merchant = new Merchant({
          name: lead.name,
          email: lead.email,
          agent: lead.agent,
          processor: lead.processor,
          nmiApiKey: lead.nmiApiKey,
          transactionFee: lead.transactionFee,
          authorizationFee: lead.authorizationFee,
          pricingModel: lead.pricingModel
        });
        await merchant.save();
      }
    }
    res.json(lead);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useMemoryDB) {
    const leads = req.app.locals.memoryLeads;
    const index = leads.findIndex(l => l._id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    leads[index] = { ...leads[index], ...req.body };
    const lead = leads[index];
    if (lead.approved) {
      const exists = req.app.locals.memoryMerchants.find(
        m => m.name === lead.name && m.email === lead.email
      );
      if (!exists) {
        const merchant = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: lead.name,
          email: lead.email,
          agent: lead.agent,
          processor: lead.processor,
          nmiApiKey: lead.nmiApiKey,
          transactionFee: lead.transactionFee,
          authorizationFee: lead.authorizationFee,
          pricingModel: lead.pricingModel
        };
        req.app.locals.memoryMerchants.push(merchant);
      }
    }
    res.json(lead);
  } else {
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    if (lead && lead.approved) {
      const exists = await Merchant.findOne({
        name: lead.name,
        email: lead.email
      });
      if (!exists) {
        const merchant = new Merchant({
          name: lead.name,
          email: lead.email,
          agent: lead.agent,
          processor: lead.processor,
          nmiApiKey: lead.nmiApiKey,
          transactionFee: lead.transactionFee,
          authorizationFee: lead.authorizationFee,
          pricingModel: lead.pricingModel
        });
        await merchant.save();
      }
    }
    res.json(lead);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useMemoryDB) {
    const leads = req.app.locals.memoryLeads;
    const index = leads.findIndex(l => l._id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    leads.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    await Lead.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  }
});

export default router;
