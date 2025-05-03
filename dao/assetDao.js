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
        error.code = 'assetAlreadyExists';
        throw error;
    }

    //getting status
    const status = await Status.findById(assetData.statusId);
    if (!status) { 
      const error = new Error(`Status was not found`);
      error.code = 'statusNotFound';
      throw error; 
    };
    
    //setting defaults
    const defaults = {
      ip: null,
      hostname: null,
      software: null,
      version: null,
      online: false,
      vulnerabilities: []
    };

    //creating asset
    const { statusId, ...cleanData } = assetData;
    const asset = new Asset({
      ...defaults,
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
  const status = await Status.findById(statusId);
  if (!status) { 
    const error = new Error(`Status was not found`);
    error.code = 'statusNotFound';
    throw error; 
  };
  const assets = await Asset.find({ statusId }).populate("statusId");
  const dtoOut = assets.map(formatAsset);
  return dtoOut;
}

//Get asset by id
export async function getAsset(assetId) {
  const asset = await Asset.findById(assetId).populate("statusId");
  if (!asset) {
    const error = new Error(`Asset with ID doesn't exist`);
    error.code = 'assetNotExists';
    throw error;
  };
  return formatAsset(asset);
}

//Delete asset
export async function deleteAsset(assetId) {
  await Asset.deleteOne({ _id: assetId })
};

//Edit asset
export async function editAsset(assetData) {
  const { _id, ...updateData } = assetData;

  //checking if asset exists
  const asset = await Asset.findById(_id);
  if (!asset) {
    const error = new Error(`Asset with such ID doesn't exist`);
    error.code = 'assetNotExists';
    throw error;
  };

  //checking if status exists
  if (updateData.statusId && updateData.statusId !== asset.statusId) {
    const status = await Status.findById(updateData.statusId);
    if (!status) { 
      const error = new Error(`Status was not found`);
      error.code = 'statusNotFound';
      throw error; 
    };
  }

  //checking if name is want to be changed
  if (updateData.name && updateData.name !== asset.name) {
    const nameTaken = await Asset.findOne({ name: updateData.name });
    if (nameTaken) {
      const error = new Error('Asset with such name already exists');
      error.code = 'assetAlreadyExists';
      throw error;
    };
  };

  //updating asset fields
  Object.assign(asset, updateData);

  const newAsset = await asset.save();
  return formatAsset(newAsset);
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