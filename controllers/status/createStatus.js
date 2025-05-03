import { createStatuses } from '../../dao/statusDao.js';

//nothing to validate

export async function handleCreateStatuses(req, res) {
    try {
        const statuses = await createStatuses();
        res.status(201).json(statuses);
    } catch (err) {
        res.status(500).json({error: 'Error while creating statuses', detailes: err.message})
    }
}