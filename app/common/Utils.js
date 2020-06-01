

export class Utils {
    static arrayToLower(mcArray) {
        let tmp = mcArray.join('~').toLowerCase();
        return tmp.split('~');
    }

    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
    }

    static encrypt(text) {
        const crypto = require('crypto');
        let algorithm = 'aes192',
            password = '-';//TODO extract from here

        let cipher = crypto.createCipher(algorithm, password);
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return Buffer.from(crypted, 'ascii').toString('base64');
    }

    static decrypt(text) {
        const crypto = require('crypto');
        let algorithm = 'aes192',
            password = '-';//TODO extract from here

        let decipher = crypto.createDecipher(algorithm, password);
        let dec = decipher.update(Buffer.from(text, 'base64').toString('ascii'), 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
}

