import { displayAsset } from '../../dao/assetDao.js';

export async function handleDisplayAsset(req, res) {
    try {
        const assetList = await displayAsset();
        res.status(200).json(assetList);
    } catch (err) {
        res.status(500).json({ error: 'Error while getting asset list', details: err.message})
    }
}