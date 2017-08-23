/**
 * This is a file used to test the GET service routes of a given API endpoint. Test cases are generated dynamically by
 * iterating over collections of JSON Test Case objects. Currently it uses two collections, one for positive tests, and
 * one for negative tests. In order for this file to be used properly, a particular folder structure for each service
 * being tested is necessary, as detailed on the README file of the project.
 */
"use strict";
const requestUtilities = require('../lib/httpRequestUtilities');
const validationLib = require('../lib/validationLibrary');
const assert = require('assert');

//These constants are used to set the Endpoint to be tested, and the particular service route. They could be set via 
//environment variables when they're run through Jenkins jobs so that different test suites could be created using only
//this Tester script.
const testEndpointURL = "https://jsonplaceholder.typicode.com/";
const testService = 'posts';

// List of keys to be ignored during response validation. May be overwritten in a test by setting the testCaseObject 
// ignoredKeys property. Commonly used to ignore dates, timestamps or authentication tokens on responses.
const defaultIgnoredKeys = [
  'id'  
];

// The tagFilter can be used to run only testCaseObjects that contain it.
const tagFilter = "";

//This is the main mocha Test Suite used to test the specified service
describe("Test Suite for the '" + testService + "' service", function() {
    //This sets the mocha timeout and the slow warning on each test that is run
    this.timeout(5000);
    this.slow(1000);
    let completeEndpointUrl = testEndpointURL + testService;

    //This loads the collections of test cases into variables that we can use during execution of the tests.
    let positiveTests = require('./' + testService + '/GET/testCases/positiveTests.json');
    let negativeTests = require('./' + testService + '/GET/testCases/negativeTests.json');
    
    //This iterates over the positiveTests collection, and creates a test case using the testDescription property.
    positiveTests.forEach(function(testCaseObject) {
        
        if (tagFilter != "" && testCaseObject.tags.indexOf(tagFilter) < 0) return;
        
        it(testCaseObject.testNumber + " - " + testCaseObject.testDescription, function(done) {
            
            //These variables are used to specify the directories where results will be saved, and where the expected
            //response for this test case can be found.
            let fullTestCasesDirPath = './test/' + testService + '/GET/testRunResults/fullTestCases';
            let actualResponsesDirPath = './test/' + testService + '/GET/testRunResults/actualResponses';
            let expectedResponsePath = './' + testService + '/GET/expectedResponses/' + testCaseObject.testNumber + '.json';
            
            //Adds the complete url for the test along with the expected response to the current testCaseObject
            testCaseObject["testURL"] = completeEndpointUrl;
            testCaseObject["expectedResponse"] = require(expectedResponsePath);

            //Overwrites ignoredKeys if the testCaseObject specifies them
            testCaseObject.ignoredKeys = testCaseObject.ignoredKeys ? testCaseObject.ignoredKeys : defaultIgnoredKeys;
            
            //Here is where the actual test gets executed, by first sending a request using the current testCaseObject
            requestUtilities.getRequest(testCaseObject)
                .then( response => {
                    //Validate a response is received, and add it to the testCaseObject
                    assert.notEqual(response.body, undefined, "No response was received.");
                    testCaseObject["actualResponse"] = response.body;
                    
                    //Record the results into the specified directories
                    validationLib.recordResults(testCaseObject, fullTestCasesDirPath, testCaseObject.testNumber);
                    validationLib.recordResults(testCaseObject.actualResponse, actualResponsesDirPath, testCaseObject.testNumber);
                    
                    //Compare the expected and actual responses, and generate errors if they are found
                    validationLib.validateObjectsAreEqual(testCaseObject.expectedResponse, testCaseObject.actualResponse, testCaseObject.ignoredKeys);
                    done();
                })
                .catch(done);
        })
    });

    //This iterates over the negativeTests collection, and creates a test case using the testDescription property.
    negativeTests.forEach(function(testCaseObject) {
        
        if (tagFilter != "" && testCaseObject.tags.indexOf(tagFilter) < 0) return;
        
        it(testCaseObject.testNumber + " - " + testCaseObject.testDescription, function(done) {

            //These variables are used to specify the directories where results will be saved, and where the expected
            //response for this test case can be found.
            let fullTestCasesDirPath = './test/' + testService + '/GET/testRunResults/fullTestCases';
            let actualResponsesDirPath = './test/' + testService + '/GET/testRunResults/actualResponses';
            let expectedResponsePath = './' + testService + '/GET/expectedResponses/' + testCaseObject.testNumber + '.json';

            //Adds the complete url for the test along with the expected response to the current testCaseObject
            testCaseObject["testURL"] = completeEndpointUrl;
            testCaseObject["expectedResponse"] = require(expectedResponsePath);

            //Overwrites ignoredKeys if the testCaseObject specifies them
            testCaseObject.ignoredKeys = testCaseObject.ignoredKeys ? testCaseObject.ignoredKeys : defaultIgnoredKeys;

            //Here is where the actual test gets executed, by first sending a request using the current testCaseObject
            requestUtilities.getRequest(testCaseObject)
                .then( response => {
                    //Validate a response is received, and add it to the testCaseObject
                    assert.notEqual(response.body, undefined, "No response was received.");
                    testCaseObject["actualResponse"] = response.body;

                    //Record the results into the specified directories
                    validationLib.recordResults(testCaseObject, fullTestCasesDirPath, testCaseObject.testNumber);
                    validationLib.recordResults(testCaseObject.actualResponse, actualResponsesDirPath, testCaseObject.testNumber);

                    //Compare the expected and actual responses, and generate errors if they are found
                    validationLib.validateObjectsAreEqual(testCaseObject.expectedResponse, testCaseObject.actualResponse, testCaseObject.ignoredKeys);
                    done();
                })
                .catch(done);
        })
    });

    
});
