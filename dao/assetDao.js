import Asset from '../models/asset.js';
import Status from '../models/status.js';
import { formatAsset } from '../utils/assetDtoOut.js';
import PDFDocument from 'pdfkit';


//Create asset
export async function createAsset(assetData) {
    //checking for duplicate
    const existing = await Asset.findOne({ name: assetData.name });
    if (existing) {
        const error = new Error(`Asset with name "${assetData.name}" already exists`);
        error.code = 'ASSET_EXISTS';
        throw error;
    }

    //getting status
    const status = await Status.findById(assetData.statusId);
    if (!status) { 
      const error = new Error(`Status "${statusName}" was not found`);
      error.code = 'STATUS_NOT_FOUND';
      throw error; 
    };
    
    //creating asset
    const { statusId, ...cleanData } = assetData;
    const asset = new Asset({
      ...cleanData,
      statusId: status._id
    });
    const dtoOut = formatAsset(await asset.save());
    return dtoOut;
}

//List assets
export async function listAsset() {
  const assets = await Asset.find().populate('statusId');
  const dtoOut = assets.map(formatAsset);
  return dtoOut;
}

//List assets by StatusId
export async function listAssetsByStatusId(statusId) {
  const assets = await Asset.find({ statusId }).populate("statusId");
  const dtoOut = assets.map(formatAsset);
  return dtoOut;
}

//Get asset by id
export async function getAsset(assetId) {
  const asset = await Asset.findById(assetId).populate("statusId");
  if (!asset) {
    const error = new Error(`Asset with ID "${id}" doesn't exist`);
    error.code = 'ASSET_NOT_EXISTS';
    throw error;
  };
  return asset;
}

//Delete asset
export async function deleteAsset(assetId) {
  await Asset.deleteOne({ _id: assetId })
};

//Edit asset
export async function editAsset(assetData) {
  const { id, ...updateData } = assetData;

  //checking if asset exists
  const asset = await Asset.findById(id);
  if (!asset) {
    const error = new Error(`Asset with ID "${id}" doesn't exist`);
    error.code = 'ASSET_NOT_EXISTS';
    throw error;
  };

  //checking if name is want to be changed
  if (updateData.name && updateData.name !== asset.name) {
    const nameTaken = await Asset.findOne({ name: updateData.name });
    if (nameTaken) {
      const error = new Error('Asset with such name already exists');
      error.code = 'ASSET_EXISTS';
      throw error;
    };
  };

  //updating asset fields
  Object.assign(asset, updateData);

  return await asset.save();
}

//Generate PDF
export function generateAssetPDF(assets, stream) {
    const doc = new PDFDocument();
  
    doc.pipe(stream);
  
    doc.fontSize(16).text('Asset Report', { align: 'center' });
    doc.moveDown();
  
    assets.forEach((asset, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${asset.name} - ${asset.ip} - ${asset.statusId?.name ?? 'N/A'}`
      );
    });
  
    doc.end();
  }