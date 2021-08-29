const { getData } = require('../adapter/db.js');

// this is the function to handle incoming request.
function searchRecords(request, response) {
    const { startDate, endDate, minCount, maxCount } = request.body;
    // Validation can be added here if needed and request can be rejected with HTTP Status Bad Request (400)
    getData(startDate, endDate).then((records) => {
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
    }).catch((err) => {
        // full error can also be logged here.
        console.log(err.message);
        response.send(500, { code: 500, msg: 'Failure' });
    });
}

module.exports = { searchRecords };