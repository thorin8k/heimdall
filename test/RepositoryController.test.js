
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Repository } from '../app/api/repository';

chai.use(chaiHttp);
chai.should();

const uuid = '801df43e-7305-4da7-93e0-d7432e248f34e';

describe('RepositoryController', () => {

    describe('#find()', () => {
        it('should return all repositorys', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/repository/list')
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
        it('should insert the repository and return success', (done) => {
            const app = global.cluster_server.server.app;

            const repository = new Repository(uuid, "Test");
            chai.request(app)
                .post('/repository')
                .send(repository)
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
        it('should return the repository', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/repository/${uuid}`)
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
        it('should return update repository and something', (done) => {
            const app = global.cluster_server.server.app;

            const repository = new Repository(uuid, "Test2");
            chai.request(app)
                .put(`/repository/${uuid}`)
                .send(repository)
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
        it('should return save repository and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/repository/${uuid}`)
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