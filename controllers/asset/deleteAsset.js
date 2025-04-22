import { deleteAsset } from "../../dao/assetDao.js";

export async function handleDeleteAsset(req, res) {
    try {
        await deleteAsset(req.body.name)
        res.status(200).json({message: 'Asset was successfuly deleted'})
    } catch (err) {
        res.status(500).json({error: 'Error while deleting asset',  details: err.message})
    }
}