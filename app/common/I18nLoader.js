import fs from 'fs';
import path from 'path';

//TODO convert to async/await
export class I18nLoader {
    /**
     *
     * @param lang
     * @param callback
     */
    static load(callback) {
        /*var lang = global.settings.lang.value;*/
        var lang = global.settings.getConfigValue("lang");

        fs.readFile(path.dirname(require.main.filename) + '/i18n/lang_' + lang + ".json", 'utf8', (err, data) => {
            if (err) return callback(err, null);
            var parsedData = JSON.parse(data);

            this.currentData = parsedData;
            global._ = this.translate;

            callback(null, parsedData);
        });
    }

    /**
     * 
     * @param {*} key 
     */
    static translate(key) {
        if (this.currentData && this.currentData[key]) {
            return this.currentData[key]
        }
        return "undefined." + key;
    }
}
