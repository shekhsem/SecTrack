//doesnt work yet

import { editAsset } from "../../dao/assetDao.js";

export async function handleEditAsset(req, res) {
    try {
        const newAsset = await editAsset(req.body);
        res.status(201).json(newAsset);
    } catch (err) {
        if (err.code === 'ASSET_NOT_EXISTS'){
            res.status(400).json({ error: 'Asset with such name doesn\'t exists'})
        }
        if (err.code === 'ASSET_EXISTS') {
            res.status(400).json({ error: 'Asset with such name already exists'})
          }
        res.status(500).json({error: 'Error while editing asset', details: err.message})
    }
}