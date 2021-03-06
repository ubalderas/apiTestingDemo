/**
 * This is a sample for a simple Test using a single testCaseObject defined here for clarity and for anyone to try out
 * within the same file.
 * Results are recorded in the SampleService folder.
 */
"use strict";
const requestUtilities = require('../lib/httpRequestUtilities');
const validationLib = require('../lib/validationLibrary');
const assert = require('assert');
const completeEndpointUrl = "https://jsonplaceholder.typicode.com/posts";

describe("Sample Test suite for the posts GET service", function() {
    this.timeout(5000);
    this.slow(1000);

    let testCaseObject = {
        "testURL": completeEndpointUrl,
        "testNumber": "POSTS-001",
        "testDescription": "Example 1: Should return a list of posts from jsonplaceholder",
        "tags": ["P1", "POSTS"]
    };

    it(testCaseObject.testDescription, function(done) {
        testCaseObject["expectedResponse"] = require('./SampleService/expectedResponses/' + testCaseObject.testNumber + '.json');
        requestUtilities.getRequest(testCaseObject)
            .then( response => {                
                assert.notEqual(response.body, undefined, "No response was received.");
                testCaseObject["actualResponse"] = response.body;
                validationLib.recordResults(testCaseObject, './test/SampleService/testRunResults/fullTestCases', testCaseObject.testNumber);
                validationLib.recordResults(testCaseObject.actualResponse, './test/SampleService/testRunResults/actualResponses', testCaseObject.testNumber);
                validationLib.validateObjectsAreEqual(testCaseObject.actualResponse, testCaseObject.expectedResponse);
                done();
            })
            .catch(done);
    })
});
