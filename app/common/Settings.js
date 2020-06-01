const fs = require('fs');
const path = require('path');
const nconf = require('nconf');

const cfgFileName = 'configuration.json';
const baseCfgFileName = 'baseconfig.json';

export class Settings {
    static load() {
        let baseRaw = fs.readFileSync(path.resolve(process.cwd(), baseCfgFileName), 'utf8');
        let baseSettings = JSON.parse(baseRaw);

        nconf.use('cfg', { type: 'file', file: path.resolve(process.cwd(), cfgFileName) });

        nconf.defaults(baseSettings);

        return this;
    }

    static getConfigValue(key) {
        nconf.use('cfg');
        let record = nconf.get(key);
        if (record === null || record === undefined) {
            console.error('Value not configured: ' + key);

        }
        return record !== null ? record : '';
    }

    /**
     * Devuelve todos los parametros de configuracion de la aplicacion
     * @returns {Provider}
     */
    static getAllConfigValues() {
        return nconf.get();
    }

    /**
     * Setter para cambiar un valor de config
     */
    static setConfigValue(key, value) {
        nconf.use('cfg');
        nconf.set(key, value);
    }

    /**
     * Persiste las modificaciones en la configuracion
     */
    static saveConfigModifications(callback) {
        nconf.use('cfg');
        //TODO async
        nconf.save((err) => {
            if (err) {
                if (callback) callback(err);
                console.error(err);
            }
            if (callback) callback(null);
        });
    }
}
