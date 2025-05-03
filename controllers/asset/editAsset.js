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

  //editing
  try {
      const newAsset = await editAsset(req.body);
      res.status(201).json(newAsset);
  } catch (err) {
      if (err.code === 'assetNotExists'){
          res.status(400).json({ 
            code: err.code,
            message: 'Asset with such ID doesn\'t exist',
            details: err.message
          })
      };
      if (err.code === 'statusNotFound'){
        res.status(400).json({
          code: err.code,
          error: 'Status was not found',
          details: err.message
        })
      };
      if (err.code === 'assetAlreadyExists') {
          res.status(400).json({ 
            code: err.code,
            error: 'Asset with such name already exists',
            details: err.message
          })
      };
      res.status(500).json({
        code: "unknownError",
        error: 'Error while editing asset',
        details: err.message
      })
  }
}