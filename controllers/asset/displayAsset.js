import { listAsset } from '../../dao/assetDao.js';

//nothing to validate

export async function handleListAsset(req, res) {
    try {
        const assetList = await listAsset();
        res.status(200).json(assetList);
    } catch (err) {
        res.status(500).json({ error: 'Error while getting asset list', details: err.message})
    }
}