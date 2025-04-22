import { displayStatuses } from '../../dao/statusDao.js';

export async function handleDisplayStatuses(req, res) {
    try {
        const statusList = await displayStatuses();
        res.status(200).json(statusList);
    } catch (err) {
        res.status(500).json({ error: 'An error ocured while getting status list'})
    }
}