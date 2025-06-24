import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

router.post('/', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
  res.json(lead);
});

export default router;
