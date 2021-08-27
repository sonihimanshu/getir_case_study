import { getData } from '../adapter/db';
import express from 'express';
const app = express();
app.use(express.json())


// this is the function to handle incoming request.
app.post('/records/search', async (request, response) => {
    try {
        const { startDate, endDate, minCount, maxCount } = request.body;
        // Validation can be added here if needed and request can be rejected with HTTP Status Bad Request (400)
        const records = await getData(startDate, endDate);
        const resBody = { code: 0, msg: 'success', records: [] };
        records.forEach((r) => {
            let countTotal = 0;
            r.counts.forEach(c => countTotal += c);
            // this is to filter records based on total counts.
            if (minCount <= countTotal && countTotal <= maxCount) {
                resBody.records.push({
                    key: r.key,
                    createdAt: r.createdAt,
                    totalCount: countTotal
                })
            }
        });

        response.send(resBody);
    } catch (error) {
        response.status(500).send({ code: 500, msg: 'Failure' });
    }
});

export default app;