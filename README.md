## API Testing Demo

This repo contains examples of mocha tests used to test APIs using the 'superagent' node module to generate http requests, along with 'deep-diff' to compare and validate responses.

### Installing the API Testing Demo

After you pull the repo to your machine, run an "npm install" on the root directory of the project to install the needed dependencies.

### Project Structure

The lib folder contains common utilities used to generate http requests and validate responses.

Services to be tested exist within the test folder, with the following folders and directory structure:

* test/[serviceName]/[HTTPVerb]/expectedResponses
* test/[serviceName]/[HTTPVerb]/testCases
* test/[serviceName]/[HTTPVerb]/testRunResults

For example, the tests for the 'GET' verb on the service 'posts' would have its expected responses folder here: 'test/posts/GET/expectedResponses'.

### The testCases Folder

This folder contains JSON files which themselves contain collections of testCaseObjects that are used during test runs.
The testCaseObjects contain properties that are used to identify a particular test, along with properties used to execute a test.
Currently, testCaseObjects schemas exist for GET and POST requests testing, and follow the following format:

####GET
{
    "testNumber": "The test Id of the test case.",
    "testDescription": "A useful description of the outcome of the test",
    "queryString": "A string representing the query parameters used to generate a request",
    "itemId": "The id of a specific item to be retrieved, if supported by the API endpoint",
    "tags": ["An array of strings that could be used to filter tests to be executed", "Example: POSTS"]
}

Note: tags, itemId and queryString are optional fields.

### The expectedResponses Folder

This folder contains JSON files for each test case, which are used to be compared against the response of a particular test case.
The file names should match the testNumber property of the particular test case being run.

### The testRunResults Folder

A folder that contains the results of the latest test run. Files are overwritten, but existing files that are not overwritten are not deleted.

### Running a Test Suite

There are currently two service tester files under the test folder of the project, 'SampleRequestTests.js' and 'AgnosticGETServiceTester.js'.

To run either one of them you can use the 'test' command which was added to the scripts property of the package.json file, which is mapped to run mocha, in the following manner:

npm test "[file path]", where "[file path]" in this case can be "test/SampleRequestTests.js" or "test/AgnosticGETServiceTester.js".

TL;DR, from the root directory of the project, run the following from the command line for either Test Suite:
* npm test "test/SampleRequestTests.js"
* npm test "test/AgnosticGETServiceTester.js"

The SampleRequestsTests.js is a mostly self contained script that has a single testCaseObject defined within it, and can be used to get used to the framework.

The AgnosticGETServiceTester.js is a file that contains parameters used to run multiple collections of test Cases, and can be used to run different services' GET route.
More service are still getting added, but currently only the 'posts' service contains test case collections.

### Adding new Test Cases

To add a new test case, the following steps should be completed:

* Add a new testCaseObject to either the positiveTests collection of a particular service and HTTP verb folder with the required fields.
* Add an expected Response JSON file to its corresponding expectedResponse folder, and make sure the file name corresponds to the testNumber property of the testCase that was added.
* Run the test and troubleshoot/modify test as needed.

NOTE: Project is still being developed, features and documentation will be expanded as the project grows.