import { LoginController as LoginController } from './auth/LoginController'
import { DynamicController as DynamicController } from './base/DynamicController'
import { UserController as UserController } from './user'


/**
 * Listado con las rutas que serán cargadas de forma automatica
 */
const routes = [
    LoginController,
    DynamicController,
    UserController
]


/**
 * Instancia una ruta
 * @param handler
 * @param params
 * @returns {*}
 */
createController = (Handler, params, idx) => {
    try {
        let obj = new Handler(params);
        return obj;
    } catch (ex) {
        console.log(idx);
        console.log(ex);
    }
}


export default (app) => {

    for (let idx in routes) {
        const elm = routes[idx];
        const route = createController(elm[idx], [], idx);
        if (!route) continue;

        const router = route.configure();
        if (router) {
            app.use(router);
        }
    }

}