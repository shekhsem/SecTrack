import Status from "../models/status.js";
import { formatStatus } from "../utils/statusDtoOut.js"
 
//Create fixed statuses
export async function createStatuses() {
    const statuses = ['Vulnerable', 'Pending', 'Patched', 'Review'];
    
    //deleting existing statuses
    await Status.deleteMany({});
 
    //adding statuses
    const statusDocs = statuses.map(name => new Status({ name }));
    await Status.insertMany(statusDocs);
    return listStatuses()
}

//Display existing statuses
export async function listStatuses() {
    const statuses = await Status.find();
    const dtoOut = statuses.map(formatStatus);
    return dtoOut;
}

//Get status by id
export async function getStatus(statusId) {
    const status = await Status.findById(statusId)
    if (!status) {
      const error = new Error(`Status with ID doesn't exist`);
      error.code = 'statusNotFound';
      throw error;
    };
    return formatStatus(status);
  }

