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

    let positiveTests = require('./' + testService + '/GET/testCases/positiveTests.json');
    
    positiveTests.forEach(function(testCaseObject) {
        it(testCaseObject.testDescription, function(done) {
            testCaseObject["testURL"] = completeEndpointUrl;
            testCaseObject["expectedResponse"] = require('./' + testService + "/GET/expectedResponses/" + testCaseObject.testNumber + ".json");
            requestUtilities.getRequest(testCaseObject.testURL, testCaseObject.queryString)
                .then( response => {
                    assert.notEqual(response.body, undefined, "No response was received.");
                    testCaseObject["actualResponse"] = response.body;
                    validationLib.recordResults(testCaseObject, './test/' + testService + '/GET/testRunResults/fullTestCases', testCaseObject.testNumber);
                    validationLib.recordResults(testCaseObject.actualResponse, './test/' + testService + '/GET/testRunResults/actualResponses', testCaseObject.testNumber);
                    validationLib.validateObjectsAreEqual(testCaseObject.expectedResponse, testCaseObject.actualResponse);
                    done();
                })
                .catch(done);
        })
    });

    
});
