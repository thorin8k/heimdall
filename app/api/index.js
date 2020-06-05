
import { MainController } from './main'
import { LoginController, UserController } from './user'
import { ProjectController } from './project';
import { JobController } from './job';
import { CommandController } from './command';
import { ExecutionController } from './execution';
import { RepositoryController } from './repository/RepositoryController';


/**
 * Listado con las rutas que serán cargadas de forma automatica
 */
const routes = [
    LoginController,
    MainController,
    UserController,
    ProjectController,
    JobController,
    CommandController,
    ExecutionController,
    RepositoryController
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