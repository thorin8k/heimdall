import { BaseService } from '../base';
import { User } from './';
import { Utils } from '../../common';

export class UserService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('user', User);
    }

    /**
     * Sobreescritura del metodo save del base service para establecer los atributos
     * del modelo.
     */
    save(id, data) {
        let user = { ...data }
        if (user.pass) {
            user.pass = Utils.encrypt(user.pass);
        } else {
            delete user.pass;
        }


        return super.save(id, user);
    }


    async getByUsername(username) {
        let uList = await this.list({ user: username });

        if (uList.length != 0) {
            return uList[0];
        }

        return null;
    }

}

