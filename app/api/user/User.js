import { BaseModel } from '../base';

export class User extends BaseModel {

    constructor(id, user, pass) {
        super(id);
        this.user = user;
        this.pass = pass;
    }


}