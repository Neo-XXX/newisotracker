import express from 'express';
import mongoose from 'mongoose';
import Processor from '../models/Processor.js';
import Lead from '../models/Lead.js';
import Merchant from '../models/Merchant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    const { memoryProcessors, memoryLeads, memoryMerchants } = req.app.locals;
    const processors = memoryProcessors.map(p => ({
      ...p,
      leads: memoryLeads.filter(l => l.processor === p.name).length,
      activeMerchants: memoryMerchants.filter(m => m.processor === p.name && m.status === 'approved').length
    }));
    res.json(processors);
  } else {
    const processors = await Processor.find();
    const withCounts = await Promise.all(
      processors.map(async p => {
        const leads = await Lead.countDocuments({ processor: p.name });
        const activeMerchants = await Merchant.countDocuments({ processor: p.name, status: 'approved' });
        const obj = p.toObject();
        obj.leads = leads;
        obj.activeMerchants = activeMerchants;
        return obj;
      })
    );
    res.json(withCounts);
  }
});

router.post('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    const processor = { _id: new mongoose.Types.ObjectId().toString(), ...req.body };
    req.app.locals.memoryProcessors.push(processor);
    res.json(processor);
  } else {
    const processor = new Processor(req.body);
    await processor.save();
    res.json(processor);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useMemoryDB) {
    const processors = req.app.locals.memoryProcessors;
    const index = processors.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    processors[index] = { ...processors[index], ...req.body };
    res.json(processors[index]);
  } else {
    const processor = await Processor.findByIdAndUpdate(id, req.body, { new: true });
    res.json(processor);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useMemoryDB) {
    const processors = req.app.locals.memoryProcessors;
    const index = processors.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    processors.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    await Processor.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  }
});

export default router;
