import { createAsset } from "../../dao/assetDao.js";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const schema = {
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
    statusId: { type: "string", minLength: 24, maxLength:24 }
  },
  required: ["name", "statusId"],
  additionalProperties: false
};

export async function handleCreateAsset(req, res) {
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
    }

    const newAsset = await createAsset(req.body);
    res.status(201).json(newAsset);
  } catch (err) {
    if (err.code === 'ASSET_EXISTS') {
      res.status(400).json({ error: 'Asset with such name already exists', details: err.details})
    };
    if (err.code === 'STATUS_NOT_FOUND'){
      res.status(400).json({ error: 'Status was not found', details: err.details})
    };
    console.error(err);
    res.status(500).json({ error: 'Error while creating asset', details: err.details});
  }
}