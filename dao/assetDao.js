import Asset from '../models/asset.js';

//Create asset
export async function createAsset(assetData) {
    const asset = new Asset(assetData);
    return await asset.save();
}

//List assets
export async function displayAsset() {
    return await Asset.find();
}

//Delete asset
export async function deleteAsset(assetName) {
    await Asset.deleteOne({ name: assetName})
}

//Edit asset (doesnt work yet)
export async function editAsset(assetData) {
    const query = assetData.name;
    return await Asset.findOneAndUpdate(query, assetData, {new: true})
}