import { listAssetsByStatusId } from '../../dao/assetDao.js';
import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
      _id: {type: "string", minLength: 24, maxLength:24}
    },
    required: ["_id"],
    additionalProperties: false
  };

export async function handleListAssetByStatusId(req, res) {
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
        const assetList = await listAssetsByStatusId(req.body._id);
        res.status(200).json(assetList);
    } catch (err) {
        if (err.code === 'statusNotFound'){
            res.status(400).json({
              code: err.code, 
              message: 'Status was not found',
               details: err.details
            });
        };  
        res.status(500).json({ 
            code: "unknownError",
            error: 'Error while getting asset list', 
            details: err.message})
    }
}