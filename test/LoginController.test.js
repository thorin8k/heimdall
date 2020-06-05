
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('LoginController', () => {

    describe('#login()', () => {

        it('should fail no auth', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should fail no session ', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/user/list')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should fail invalid credentials', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/login')
                .auth('admin', 'asdfasdf')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should fail empty parameters', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .post('/login')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should succeed', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .post('/login')
                .send({ user: 'admin', pass: 'admin' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
        it('should fail incorrect pass', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .post('/login')
                .send({ user: 'admin', pass: 'admi343434n' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should fail unexisting user', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .post('/login')
                .send({ user: 'fdfdsfa', pass: 'admi343434n' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('#logout()', () => {
        
        it('should succeed', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/logout')
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.success.should.be.true;
                    done();
                });
        });
    })
});