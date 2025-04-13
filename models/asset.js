import mongoose from "mongoose";
const { Schema, model , Types} = mongoose;

const assetSchema = new Schema({
    name: {type: String, required: true },
    ip: String,
    hostname: String,
    software: String,
    version: String,
    online: Boolean,
    vulnerabilities: [String],
    statusId: { type: Types.ObjectId, ref: 'Status' }
});

const Asset = model('Asset', assetSchema);
export default Asset;