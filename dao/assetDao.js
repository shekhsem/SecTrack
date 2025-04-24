import Asset from '../models/asset.js';

//Create asset
export async function createAsset(assetData) {
    const asset = new Asset(assetData);
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

//Edit asset (doesnt work yet)
export async function editAsset(assetData) {
    const { name, ...updateData } = assetData;
    const filter = { name };
    return await Asset.findOneAndUpdate(filter, { $set: assetData}, {new: true})
}