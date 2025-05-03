import { getAsset } from "../../dao/assetDao.js";
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

  export async function handleGetAsset(req, res) {
      try {
        //validating
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
        return res.status(400).json({
            error: "Validation error",
            details: valid.errors.map(err => ({
            field: err.instancePath.replace("/", ""),
            message: err.message
            }))
        });
        };
        
        const asset = await getAsset(req.body._id);
        res.status(200).json(asset);
        } catch (err) {
            if (err.code === 'ASSET_NOT_EXISTS') {
              res.status(400).json({ error: 'Asset with such id does not exist', details: err.details})
            };
            console.error(err);
            res.status(500).json({ error: 'Error while getting asset', details: err.details});
          }
    }