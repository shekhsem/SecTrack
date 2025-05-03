import { listAssetsByStatusId } from '../../dao/assetDao.js';

//nothing to validate

export async function handleListAssetByStatusId(req, res) {
    try {
        const assetList = await listAssetsByStatusId(req.body._id);
        res.status(200).json(assetList);
    } catch (err) {
        res.status(500).json({ error: 'Error while getting asset list', details: err.message})
    }
}