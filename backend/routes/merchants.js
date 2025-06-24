import express from 'express';
import Merchant from '../models/Merchant.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const merchants = await Merchant.find();
  res.json(merchants);
});

router.post('/', async (req, res) => {
  const merchant = new Merchant(req.body);
  await merchant.save();
  res.json(merchant);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const merchant = await Merchant.findByIdAndUpdate(id, req.body, { new: true });
  res.json(merchant);
});

export default router;
