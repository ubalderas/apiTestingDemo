/**
 * Created by Usbaldo Balderas on 8/16/2017.
 */
"use strict";
let request = require('superagent');

let httpRequestUtilities = function(){};

httpRequestUtilities.postRequest = function(url, contentType, payload) {
    return new Promise( (resolve, reject) => {
        request
            .post(url)
            .set('Content-type', contentType)
            .send(payload)
            .end(function(error, response) {
                if (error) {
                    console.log('Error: Failed to test ' + url);
                    console.log(error.stack);
                    return reject(error);
                }

                return resolve(response);
            })
    })
};

httpRequestUtilities.getRequest = function(url) {
    return new Promise( (resolve, reject) => {
        request
            .get(url)
            // .query(queryObject)
            .end(function(error, response) {
                if (error) {
                    console.log('Error: Failed to test ' + url);
                    console.log(error.stack);
                    return reject(error);
                }

                return resolve(response);
            })
    })
};

module.exports = httpRequestUtilities;
