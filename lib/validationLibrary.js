"use strict";

const diff = require('deep-diff').diff;
const fs = require('fs');

const validationLibrary = function() {};

validationLibrary.generateDifferencesError = function(diffObjectsCollection) {
    let errorMessage = "";
    console.log(diffObjectsCollection);
    diffObjectsCollection.forEach(function(diffObject) {
        if (diffObject.kind == 'A' && diffObject.path === undefined) {
            errorMessage += "Missing Item in Array \n" +
                "Path:      Root level\n" +
                "Index:    " + diffObject.index + "\n" +
                "Expected: " + diffObject.item.lhs + "\n" +
                "Actual:   " + diffObject.item.rhs + "\n\n"
        }

        else if (diffObject.kind == 'A') {
            errorMessage += "Missing Item in Array \n" +
                "Path:    " + diffObject.path + "\n" +
                "Index:   " + diffObject.index + "\n" +
                "Item:    " + diffObject.item.rhs + "\n\n"
        }
        
        else if (diffObject.kind == 'E') {
            errorMessage += "Different Value was found\n" +
                "Path: " + diffObject.path + "\n" +
                "Actual:   " + diffObject.lhs + "\n" +
                "Expected: " + diffObject.rhs + "\n\n"
        }
        
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