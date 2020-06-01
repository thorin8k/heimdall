
import { MainController } from './main'
import { DynamicController } from './base'
import { LoginController, UserController } from './user'


/**
 * Listado con las rutas que serán cargadas de forma automatica
 */
const routes = [
    LoginController,
    MainController,
    DynamicController,
    UserController
]


/**
 * Instancia la lista de rutas disponibles
 * @param apps
 * @returns {*}
 */
const loadRoutes = (app) => {

    for (let idx in routes) {
        const controller = routes[idx];
        let route;
        try {
            route = new controller();
        } catch (ex) {
            console.error(`Error creating ${controller.name}: ${ex}`);
        }
        if (!route) continue;

        const router = route.configure();
        if (router) {
            app.use(router);
        }
    }

};
export { loadRoutes };