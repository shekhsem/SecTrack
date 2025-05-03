import { deleteAsset } from "../../dao/assetDao.js";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: "object",
    properties: {
      _id: {type: "string", minLength: 24, maxLength:24}
    },
    required: ["_id"],
    additionalProperties: false
  };

export async function handleDeleteAsset(req, res) {
    try {
        //validating
        const validate = ajv.compile(schema);
        const valid = validate(req.body);
        
        if (!valid) {
        return res.status(400).json({ 
            code: "dtoInIsNotValid",
            message: "Input validation error",
            details: (validate.errors || []).map(err => ({
            field: err.instancePath.replace("/", ""),
            message: err.message
            }))
        });
        }

        //deleting
        await deleteAsset(req.body._id)
        res.status(200).json({
            message: 'Asset was successfuly deleted'
        })
    } catch (err) {
        res.status(500).json({
            code: 'unknownError',
            error: 'Error while deleting asset',  
            details: err.message})
    }
}