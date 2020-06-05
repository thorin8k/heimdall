import fs from 'fs';
import path from 'path';

//TODO convert to async/await
export class I18nLoader {
    /**
     *
     * @param lang
     * @param callback
     */
    static load() {
        return new Promise((resolve, reject) => {
            var lang = global.settings.getConfigValue("lang");

            fs.readFile(__dirname + '../../../i18n/lang_' + lang + ".json", 'utf8', (err, data) => {
                if (err) return reject(err);
                var parsedData = JSON.parse(data);

                this.currentData = parsedData;
                global._ = this.translate;

                resolve(parsedData);
            });
        })
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
