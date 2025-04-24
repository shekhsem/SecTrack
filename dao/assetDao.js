import Asset from '../models/asset.js';
import Status from '../models/status.js';

const assetSchema = {
    type: "object",
    properties: {
      name: { type: "string", maxLength: 150 },
      ip: { type: "string", format: "ipv4" },
      hostname: { type: "string" },
      software: { type: "string" },
      version: { type: "string" },
      online: { type: "boolean" },
      vulnerabilities: {
        type: "array",
        items: { type: "string" }
      },
      statusName: { type: "string" }
    },
    required: ["name", "statusName", "online", "ip"],
    additionalProperties: false
  };

//Create asset
export async function createAsset(assetData) {
    //1. validating input
    const { statusName, ...cleanData } = assetData;
    const validate = ajv.compile(assetSchema);
    const valid = validate(assetData);
    if (!valid) {
        const error = new Error("Validation failed");
        error.code = "VALIDATION_ERROR";
        error.details = validate.errors;
        throw error;
      }    
    //2. checking for duplicate
    const existing = await Asset.findOne({ name: assetData.name });
    if (existing) {
        const error = new Error(`Asset with name "${assetData.name}" already exists`);
        error.code = 'ASSET_EXISTS';
        throw error;
    }

    //3. getting status
    let status = null;
    if (statusName) {
      status = await Status.findOne({ name: statusName });
      if (!status) {
        const error = new Error(`Статус "${statusName}" не найден`);
        error.code = 'STATUS_NOT_FOUND';
        throw error;
      }
    }
    
    //4. creating asset
    const asset = new Asset({
        ...cleanData,
        statusId: status ? status._id : undefined
      });

    return await asset.save();
}

//List assets
export async function displayAsset() {
    return await Asset.find().populate('statusId');
}

//Delete asset
export async function deleteAsset(assetName) {
    await Asset.deleteOne({ name: assetName})
}

//Edit asset
export async function editAsset(assetData) {
    const { _id, ...updateData } = assetData;
    //_check if asset exists
    const asset = await Asset.findById(_id);
    if (!asset) {
        const error = new Error(`Asset with name "${assetData.name}" doesn't exist`);
        error.code = 'ASSET_NOT_EXISTS';
        throw error;
    }
    
    //_checking if asset with such name already exists
    if (updateData.name && updateData.name !== asset.name){
        const nameTaken = await Asset.findOne({ name: updateData.name });
        if(nameTaken){
            const error = new Error('Asset with such name already exists');
            error.code = 'ASSET_EXISTS';
            throw error;
        }
    }
    Object.assign(asset, updateData);
    return await asset.save();
}