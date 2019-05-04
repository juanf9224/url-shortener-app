
const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcde
fghijklmnopqrstuvwxyz0123456789`
// Shorten url logic
const shortenUrl = (url: string) => {
    return Base64.encode(url);
}

const originalUrl = (shortUrl: string) => {
    const hash = Base64.decode(shortUrl);
    return hash;
}

const Base64 = {

    encode: (input: string) => {
        
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
        }

        return output;
    },

    decode : function (input: string) {

        let output = '';
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(new RegExp(/[^A-Za-z0-9\+\/\=]/g), '');

        while (i < input.length) {

            enc1 = chars.indexOf(input.charAt(i++));
            enc2 = chars.indexOf(input.charAt(i++));
            enc3 = chars.indexOf(input.charAt(i++));
            enc4 = chars.indexOf(input.charAt(i++)); 

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }


            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }
        return output;

    }
}

export default shortenUrl;