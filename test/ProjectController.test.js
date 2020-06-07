
import chai from 'chai';
import chaiHttp from 'chai-http';

import { Project } from '../app/api/project';

chai.use(chaiHttp);
chai.should();

const uuid = '801df43e-7301-4da7-93e0-d739e248fede';

describe('ProjectController', () => {

    describe('#find()', () => {
        it('should return all projects', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/project/list')
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
        it('should insert the project and return success', (done) => {
            const app = global.cluster_server.server.app;

            const project = new Project(uuid, "Test");
            chai.request(app)
                .post('/project')
                .send(project)
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
        it('should return the project', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .get(`/project/${uuid}`)
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
        it('should return update project and something', (done) => {
            const app = global.cluster_server.server.app;

            const project = new Project(uuid, "Test2");
            chai.request(app)
                .put(`/project/${uuid}`)
                .send(project)
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
        it('should return save project and something', (done) => {
            const app = global.cluster_server.server.app;

            chai.request(app)
                .delete(`/project/${uuid}`)
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