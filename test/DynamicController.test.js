
import chai from 'chai';
import chaiHttp from 'chai-http';


chai.use(chaiHttp);
chai.should();



describe('DynamicController', () => {
    describe('#find()', () => {
        it('should return something', (done) => {
            const app = global.cluster_server.server.app;
            chai.request(app)
                .get('/user/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});