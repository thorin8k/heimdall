import Axios from "axios";

export default class UserHandler {

    static currentUser = null;


    static async setUser(user) {
        if (!user) {
            throw new Error('User not received');
        }
        const data = await Axios.post('/login', user, { withCredentials: true });
        this.currentUser = data.data.data;

    }

    static async logout() {
        if (this.currentUser) {

            const data = await Axios.get('/logout', { withCredentials: true });
            console.log(data);
        }
    }

    static getUser() {
        return this.currentUser;
    }


    static async isAuthenticated() {
        if (this.currentUser == null) {
            try {
                const data = await Axios.get('/session', { withCredentials: true });

                if (data.data.status === 403) {
                    return false;
                }
                this.currentUser = data.data.data;
            } catch (e) {
                console.error(e);
                return false;
            }
        }

        return this.currentUser != null;
    }
}
