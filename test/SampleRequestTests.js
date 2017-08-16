/**
 * Created by Usbaldo Balderas on 8/16/2017.
 */
"use strict";
const requestUtilities = require('../lib/httpRequestUtilities');
const assert = require('assert');

describe("Sample Project", function() {
    this.timeout(5000);
    this.slow(1000);
    let contentType = "application/json";
    let completeEndpointUrl = "https://jsonplaceholder.typicode.com/posts";

    it("Sends a single requests to posts and prints the response", function(done) {
        requestUtilities.getRequest(completeEndpointUrl)
            .then( response => {
                assert.notEqual(response.body, undefined, "No response was received.");
                console.log(response.body);
                done();
            })
            .catch(done);
    })
});
