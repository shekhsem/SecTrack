import Status from "../models/status.js";
 
//Create fixed statuses
export async function createStatuses() {
    const statuses = ['Vulnerable', 'Pending', 'Patched', 'Review'];
    
    //deleting existing statuses
    await Status.deleteMany({});
 
    //adding statuses
    const statusDocs = statuses.map(name => new Status({name}));
    await Status.insertMany(statusDocs);
}

