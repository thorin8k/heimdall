
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Execution } from '../app/api/execution';

chai.use(chaiHttp);
chai.should();

const uuid = '801df43e-7305-4da7-93e0-d739e248fede';

describe('ExecutionController', () => {

    describe('#find()', () => {
        it('should return all executions', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/execution/list')
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });

    describe('#insertOne()', () => {
        it('should insert the execution and return success', (done) => {
            const app = global.cluster_server.server.app;

            const execution = new Execution(uuid, "Test");
            chai.request(app)
                .post('/execution')
                .send(execution)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('#getOne()', () => {
        it('should return the execution', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/execution/${uuid}`)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('array');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    
    describe('#updateOne()', () => {
        it('should return update execution and something', (done) => {
            const app = global.cluster_server.server.app;

            const execution = new Execution(uuid, "Test2");
            chai.request(app)
                .post(`/execution/${uuid}`)
                .send(execution)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('#deleteOne()', () => {
        it('should return save execution and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/execution/${uuid}`)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
});