/**
 * Created by Usbaldo Balderas on 8/16/2017.
 */
"use strict";
const requestUtilities = require('../lib/httpRequestUtilities');
const validationLib = require('../lib/validationLibrary');
const assert = require('assert');
const testEndpointURL = "https://jsonplaceholder.typicode.com/";
const testService = 'posts';

describe("Test Suite for the '" + testService + "' service", function() {
    this.timeout(5000);
    this.slow(1000);
    let contentType = "application/json";
    let completeEndpointUrl = testEndpointURL + testService;

    let testCaseObject = {
        "testURL": completeEndpointUrl,
        "testNumber": "POSTS-001",
        "testDescription": "Example 1: Should return a list of posts from jsonplaceholder",
        "tags": ["P1", "POSTS"]
    };

    it(testCaseObject.testDescription, function(done) {
        requestUtilities.getRequest(completeEndpointUrl)
            .then( response => {
                
                assert.notEqual(response.body, undefined, "No response was received.");
                testCaseObject["actualResponse"] = response.body;
                validationLib.recordResults(testCaseObject, './test/results', testCaseObject.testNumber);
                done();
            })
            .catch(done);
    })
});
