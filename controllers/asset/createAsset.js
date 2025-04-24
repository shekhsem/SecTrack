import { createAsset } from "../../dao/assetDao.js";

export async function handleCreateAsset(req, res) {
  try {
    const newAsset = await createAsset(req.body);
    res.status(201).json(newAsset);
  } catch (err) {
    if (err.code === 'ASSET_EXISTS') {
      res.status(400).json({ error: `Asset with such name already exists`})
    }
    if (err.code === 'STATUS_NOT_FOUND'){
      res.status(400).json({ error: 'Status was not found'})
    };
    }
    console.error(err);
    res.status(500).json({ error: 'Error while creating asset', details: err.message });
  }