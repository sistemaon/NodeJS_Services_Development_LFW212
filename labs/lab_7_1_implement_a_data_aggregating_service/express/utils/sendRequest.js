
const http = require('http');

const sendRequest = (url, timeout = 5000) => {
    return new Promise((resolve, reject) => {
        const request = http.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(
                    `Invalid content-type.\nExpected application/json but received ${contentType}`
                );
            }
            if (error) {
                console.error(error.message);
                res.resume();
                return reject({ statusCode });
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    return resolve(parsedData);
                } catch (e) {
                    return reject(e);
                }
            });
        });

        request.on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            return reject(e);
        });

        // Timeout handling
        const timeoutId = setTimeout(() => {
            request.destroy();
            const timeoutError = new Error('Request timed out!');
            return reject(timeoutError);
        }, timeout);

        // Clear the timeout if the request completes successfully
        request.on('response', () => {
            clearTimeout(timeoutId);
        });
    });
};

module.exports = sendRequest;