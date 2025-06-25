import express from 'express';
import mongoose from 'mongoose';
import Merchant from '../models/Merchant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    res.json(req.app.locals.memoryMerchants);
  } else {
    const merchants = await Merchant.find();
    res.json(merchants);
  }
});

router.post('/', async (req, res) => {
  if (req.app.locals.useMemoryDB) {
    const merchant = {
      _id: new mongoose.Types.ObjectId().toString(),
      volume: { daily: 0, weekly: 0, ytd: 0 },
      ...req.body
    };
    req.app.locals.memoryMerchants.push(merchant);
    res.json(merchant);
  } else {
    const merchant = new Merchant({
      volume: { daily: 0, weekly: 0, ytd: 0 },
      ...req.body
    });
    await merchant.save();
    res.json(merchant);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useMemoryDB) {
    const merchants = req.app.locals.memoryMerchants;
    const index = merchants.findIndex(m => m._id === id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    merchants[index] = { ...merchants[index], ...req.body };
    res.json(merchants[index]);
  } else {
    const merchant = await Merchant.findByIdAndUpdate(id, req.body, { new: true });
    res.json(merchant);
  }
});

export default router;
