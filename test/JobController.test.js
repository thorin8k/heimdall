
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Job } from '../app/api/job';

chai.use(chaiHttp);
chai.should();

const uuid = '801df43e-7305-4da7-93e0-d739e248fede';

describe('JobController', () => {

    describe('#find()', () => {
        it('should return all jobs', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/job/list')
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
        it('should insert the job and return success', (done) => {
            const app = global.cluster_server.server.app;

            const job = new Job(uuid, "Test");
            chai.request(app)
                .post('/job')
                .send(job)
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
        it('should return the job', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/job/${uuid}`)
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
        it('should return update job and something', (done) => {
            const app = global.cluster_server.server.app;

            const job = new Job(uuid, "Test2");
            chai.request(app)
                .put(`/job/${uuid}`)
                .send(job)
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
        it('should return save job and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/job/${uuid}`)
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