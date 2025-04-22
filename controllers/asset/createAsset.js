import { createAsset } from "../../dao/assetDao.js";

export async function handleCreateAsset(req, res) {
    try {
        const asset = await createAsset(req.body);
        res.status(201).json(asset);
    } catch (err) {
        res.status(500).json({error: 'Error while creating asset', details: err.message})
    }
}