
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('MainController', () => {

    describe('#translations()', () => {

        it('should return i18n', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/translation')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        
    });
    describe('#config()', () => {

        it('should return config', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/config')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        
    });
    describe('#logs()', () => {

        it('should return info log', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/log/info')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should return fail', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/log/blabla')
                .auth('admin', 'admin')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        
    });

});