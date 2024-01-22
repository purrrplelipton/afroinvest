import { Router } from 'express';
import RiskModel from '../models/index.js';

const $ = Router();

$.get('/:score', async ({ params }, res) => {
	try {
		const data = await RiskModel.findOne({ score: parseInt(params.score, 10) });

		if (!data) {
			return res.status(404).json({ error: 'Data not found' });
		}

		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default $;
