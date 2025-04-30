import { createStatuses } from '../../dao/statusDao.js';

//nothing to validate

export async function handleCreateStatuses(req, res) {
    try {
        await createStatuses();
        res.status(201).json({message: 'Statuses have been written to the database'});
    } catch (err) {
        res.status(500).json({error: 'Error while creating statuses', detailes: err.message})
    }
}