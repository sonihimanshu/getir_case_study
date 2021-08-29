const recordModel = require('./Model/Record.js');

// this function will fetch data from DB based on given filter dates
function getData(startDate, endDate) {
    return recordModel.find({
        createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lt: new Date(endDate).toISOString(),
        }
    });
}

module.exports = { getData };