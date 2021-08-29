
const sinon = require('sinon');
const chai = require('chai');
const db = require('../../api/adapter/db.js');
const recordModel = require('../../api/adapter/Model/Record.js');
const recordController = require('../../api/controller/recordsController.js');

chai.should();
chai.config.includeStack = true;

const createResponse = () => {
    const response = {
        send: (param1, param2) => { },
        sendStatus: (param1) => { },
    };
    return response;
};

describe('recordsController', () => {
    const res = createResponse();
    let sendSpy;

    beforeEach(() => {
        sendSpy = sinon.spy(res, 'send');
    });

    afterEach(() => {
        sendSpy.restore();
    });

    describe('POST /records/search', () => {

        const req = {
            body: {
                "startDate": "2021-08-25",
                "endDate": "2021-08-26",
                "minCount": 100,
                "maxCount": 400
            }
        };

        it('should give success response: 200', (done) => {


            const recordModelStub = sinon.stub(recordModel, 'find').returns(
                Promise.resolve([{
                    "key": "TAKwGc6Jr4i8Z487",
                    "createdAt": "2021-08-25T01:22:14.398Z",
                    "counts": [150, 160]
                }])
            );

            recordController.searchRecords(req, res);

            setTimeout(() => {
                sendSpy.withArgs(500, { msg: 'Failure' }).called.should.be.false;
                sendSpy.called.should.be.true;
                recordModelStub.restore();
                done();
            }, 500);
        });

        it('should give Failure response: 500', (done) => {
            const recordModelStub = sinon.stub(recordModel, 'find').returns(
                Promise.reject("some error"));

            recordController.searchRecords(req, res);

            setTimeout(() => {
                sendSpy.called.should.be.true;
                sendSpy.withArgs(500, { code: 500, msg: 'Failure' }).called.should.be.true;
                recordModelStub.restore();
                done();
            }, 500);
        });
    });
});
