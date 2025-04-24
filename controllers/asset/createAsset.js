import { createAsset } from "../../dao/assetDao.js";
import Status from '../../models/status.js';

export async function handleCreateAsset(req, res) {
  try {
    const { statusName, ...assetData } = req.body;

    let status = null;
    if (statusName) {
      status = await Status.findOne({ name: statusName });
      if (!status) {
        return res.status(400).json({ error: `Статус "${statusName}" не найден` });
      }
    }

    const newAsset = await createAsset({
      ...assetData,
      statusId: status ? status._id : undefined
    });

    res.status(201).json(newAsset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании ассета', details: err.message });
  }
}