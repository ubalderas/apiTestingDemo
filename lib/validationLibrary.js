"use strict";

const diff = require('deep-diff').diff;
const fs = require('fs');

const validationLibrary = function() {};

validationLibrary.generateDifferencesError = function(diffObjectsCollection) {
    let errorMessage = "";
    diffObjectsCollection.forEach(function(diffObject) {
        errorMessage += "Object path: " + diffObject.path + "\n" +
                "Actual:   " + diffObject.lhs + "\n" +
                "Expected: " + diffObject.rhs + "\n\n"
    });
    
    return errorMessage;
};

validationLibrary.validateObjectsAreEqual = function(actual, expected, ignoredKeys) {
    if (ignoredKeys === undefined) {
        ignoredKeys = [];
    }
    
    let differences = diff(actual, expected, function(path, key) {
        return ignoredKeys.indexOf(key) >= 0;
    });
    
    if (differences != undefined) {
        let errorMessage = this.generateDifferencesError(differences);
        throw new Error("The following differences were found:\n\n" + errorMessage);
    }
};

validationLibrary.recordResults = function(testCaseObject, dirPath, fileName) {
    if (!(fs.existsSync(dirPath))) {
        fs.mkdir(dirPath, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
        
    let filePath = dirPath + "/" + fileName + ".json";
    fs.writeFile(filePath, JSON.stringify(testCaseObject, null, '\t'), function(err) {
        if (err) {
            return console.log(err);
        }
    });
    
};

module.exports = validationLibrary;