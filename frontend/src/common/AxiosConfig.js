import axios from 'axios';

export default class AxiosConfig {

    /**
     * Se encarga de configurar el interceptor para los errores en las llamadas AJAX realizadas
     */
    static configureAxios(app) {
        let myUrl = new URL(window.location.href);
        axios.defaults.baseURL = "http://" + myUrl.hostname + ":3006";
        // Add a request interceptor
        axios.interceptors.response.use(function (response) {
            switch (response.data.status) {
                case 401:
                    console.log(response.data.message);
                    break;
                case 402:
                    console.log(response.data.message)
                    break;
                case 403:
                    if (app) {
                        app.unauthorized();
                    }
                    console.log('unauthorized')
                    break;
                case 500:
                    console.log(response.data.message)
                    break;
                case null:
                case "":
                case undefined:
                case "undefined":
                default:
                    break;
            }
            // Do something before request is sent
            return response;
        }, function (error) {
            switch (error.response.data.status) {
                case 403:
                    if (app) {
                        app.unauthorized();
                    }
                    console.log('unauthorized')
                    break;
                default:
                    break;
            }
            // Do something with request error
            console.log("Se ha producido un error en la llamada al servidor")
            return Promise.reject(error);
        });
    }
}