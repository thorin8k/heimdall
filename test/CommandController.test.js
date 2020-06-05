
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Command } from '../app/api/command';

chai.use(chaiHttp);
chai.should();

const uuid = '801df43e-7305-4da7-93e0-d7432e248fede';

describe('CommandController', () => {

    describe('#find()', () => {
        it('should return all commands', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/command/list')
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
        it('should insert the command and return success', (done) => {
            const app = global.cluster_server.server.app;

            const command = new Command(uuid, "Test");
            chai.request(app)
                .post('/command')
                .send(command)
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
        it('should return the command', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/command/${uuid}`)
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
        it('should return update command and something', (done) => {
            const app = global.cluster_server.server.app;

            const command = new Command(uuid, "Test2");
            chai.request(app)
                .post(`/command/${uuid}`)
                .send(command)
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
        it('should return save command and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/command/${uuid}`)
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