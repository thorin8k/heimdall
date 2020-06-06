
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Agent } from '../app/api/agent';

chai.use(chaiHttp);
chai.should();

const uuid = '80123xc43e-7301-4da7-93e0-d739e248fede';

describe('AgentController', () => {

    describe('#find()', () => {
        it('should return all agents', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/agent/list')
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
        it('should insert the agent and return success', (done) => {
            const app = global.cluster_server.server.app;

            const agent = new Agent(uuid, "Test");
            chai.request(app)
                .post('/agent')
                .send(agent)
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
        it('should return the agent', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/agent/${uuid}`)
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
        it('should return update agent and something', (done) => {
            const app = global.cluster_server.server.app;

            const agent = new Agent(uuid, "Test2");
            chai.request(app)
                .post(`/agent/${uuid}`)
                .send(agent)
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
        it('should return save agent and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/agent/${uuid}`)
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