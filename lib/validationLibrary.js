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
    })
};

validationLibrary.validateObjectsAreEqual = function(actual, expected, ignoredKeys) {
    if (ignoredKeys === undefined) {
        ignoredKeys = [];
    }
    
    let differences = diff(actual, expected, function(path, key) {
        return ignoredKeys.indexOf(key) >=0;
    });
    
    if (differences != undefined) {
        let errorMessage = this.generateDifferencesError(differences);
        throw new Error("The following differences were found:\n\n" + errorMessage);
    }
};

validationLibrary.recordResults = function(testCaseObject, dirPath, fileName) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, function(err) {
            if (err) {
                throw new Error(err);
            }
            console.log("Directory '" + dirPath + "' was created.");
        });
        
        let filePath = dirPath + "/" + fileName + ".json";
        fs.writeFileSync(filePath, JSON.stringify(testCaseObject, null, '\t'), function(err) {
            if (err) {
                throw new Error(err);
            }
            console.log("File was saved");
        });
    }
};

module.exports = validationLibrary;