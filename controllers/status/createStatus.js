import { createStatuses } from '../../dao/statusDao.js';

export async function handleCreateStatuses(req, res) {
    try {
        await createStatuses();
        res.status(201).json({message: 'Statuses writen into DB'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error occured while creating statuses'})
    }
}