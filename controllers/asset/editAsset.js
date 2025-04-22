//doesnt work yet

import { editAsset } from "../../dao/assetDao.js";

export async function handleEditAsset(req, res) {
    try {
        const newAsset = await editAsset(req.body);
        res.status(201).json(newAsset);
    } catch (err) {
        res.status(500).json({error: 'Error while editing asset', details: err.message})
    }
}