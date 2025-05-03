import { getStatus } from "../../dao/statusDao.js";
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

  export async function handleGetStatus(req, res) {
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
        
        //getting status
        const status = await getStatus(req.body._id);
        res.status(200).json(status);
        } catch (err) {
            if (err.code === 'statusNotFound') {
              res.status(400).json({ 
                code: err.code,
                error: 'Status with such id does not exist', 
                details: err.details})
            };
            console.error(err);
            res.status(500).json({ 
              error: 'Error while getting status', 
              details: err.details
            });
          };
    }