import chai from 'chai';
import { BaseModel } from '../app/api/base';
import { User } from '../app/api/user';

chai.should();

describe('BaseModel', () => {

    describe('#fromObject()', () => {
        it('should return object of class BaseModel', (done) => {
            let model = BaseModel.fromObject({ user: 'test', pass: 'test' });

            done();
        });
    });

    describe('subclass#fromObject()', () => {
        it('should return object of class subclass', (done) => {
            let model = User.fromObject({ user: 'test', pass: 'test' });

            done();
        });
    });

});