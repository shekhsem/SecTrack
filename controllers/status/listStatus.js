import { listStatuses } from '../../dao/statusDao.js';

//nothing to validate

export async function handleListStatuses(req, res) {
    try {
        const statusList = await listStatuses();
        res.status(200).json(statusList);
    } catch (err) {
        res.status(500).json({ error: 'An error ocured while getting status list'})
    }
}