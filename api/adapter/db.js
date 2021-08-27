import recordModel from './Model/Record';

// this function will fetch data from DB based on given filter dates
async function getData(startDate, endDate) {
    return recordModel.find({
        createdAt: {
            $gte: new Date(startDate).toISOString(),
            $lt: new Date(endDate).toISOString(),
        }
    });
}

export { getData };