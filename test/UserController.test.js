
import chai from 'chai';
import chaiHttp from 'chai-http';

import { User } from '../app/api/user';

chai.use(chaiHttp);
chai.should();

const uuid = '801df00e-7301-4da7-93e0-d739e248fede';

describe('UserController', () => {

    describe('#find()', () => {
        it('should return all users', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/user/list')
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
        it('should insert the user and return success', (done) => {
            const app = global.cluster_server.server.app;

            const user = new User(uuid, "test", "test");
            chai.request(app)
                .post('/user')
                .send(user)
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
        it('should return the user', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/user/${uuid}`)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('array');
                    res.body.success.should.be.true;
                    done();
                });
        });
        it('should fail with not found', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/cosa/${uuid}`)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    describe('#session()', () => {
        it('should return current session', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/session`)
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    });
    describe('#updateOne()', () => {
        it('should return update user and something', (done) => {
            const app = global.cluster_server.server.app;

            const user = new User(uuid, "test2", "test3434");
            chai.request(app)
                .post(`/user/${uuid}`)
                .send(user)
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
        it('should return save user and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/user/${uuid}`)
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