import mongoose from "mongoose";
const { Schema, model, Types} = mongoose;

const statusSchema = new Schema({
    id: String,
    name: String
});

const Status = model('Status', statusSchema);
export default Status;