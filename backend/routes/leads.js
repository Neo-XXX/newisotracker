import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';

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
    res.json(lead);
  } else {
    const lead = new Lead(req.body);
    await lead.save();
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
    res.json(leads[index]);
  } else {
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    res.json(lead);
  }
});

export default router;
