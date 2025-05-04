import { listAsset } from '../../dao/assetDao.js';
import { generateAssetPDF } from '../../dao/assetDao.js';

//nothing to validate

export async function handleGeneratePdf(req, res) {
  try {
    const assets = await listAsset();

    if (assets.length === 0) {
      return res.status(400).json({
        code: "assetListIsEmpty",
        message: "Cannot generate PDF — no assets found",
        error: err.message
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=assets.pdf');

    generateAssetPDF(assets, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: "unknownError", 
      message: 'Error while generating PDF', 
      error: err.message 
    });
  }
}