import { editAsset } from "../../dao/assetDao.js";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    _id: {type: "string", minLength: 24, maxLength:24},
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
    statusId: { type: "string", minLength: 24, maxLength:24 }
  },
  required: ["_id"],
  additionalProperties: false
};


export async function handleEditAsset(req, res) {
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
    }

    //editing
    try {
        const newAsset = await editAsset(req.body);
        res.status(201).json(newAsset);
    } catch (err) {
        if (err.code === 'ASSET_NOT_EXISTS'){
            res.status(400).json({ error: 'Asset with such name doesn\'t exists'})
        }
        if (err.code === 'ASSET_EXISTS') {
            res.status(400).json({ error: 'Asset with such name already exists'})
          }
        res.status(500).json({error: 'Error while editing asset', details: err.message})
    }
}