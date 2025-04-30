import { listAsset } from '../../dao/assetDao.js';
import { generateAssetPDF } from '../../dao/assetDao.js';

//nothing to validate

export async function handleGeneratePdf(req, res) {
  try {
    const assets = await listAsset();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=assets.pdf');

    generateAssetPDF(assets, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error while generating PDF', error: err.message });
  }
}