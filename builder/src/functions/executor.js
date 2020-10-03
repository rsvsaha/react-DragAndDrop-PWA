
const functionComponent = require('./functions').functionComponent;
const config =  require('./config');

var StateMap = new Map();

var executor = function (config,StateMap) {
    // console.log(config);    
    var processQueue = [...config];

    while (processQueue.length > 0) {
        var processObject = processQueue.shift();
        // console.log(processObject);
        var processId = processObject.id;
        var functionName = processObject.functionName;
        var functionType = processObject.functionType;
        var functionArguments = processObject.functionArgs;
        functionComponent[functionType][functionName](functionArguments, StateMap);
    }


}
module.exports = executor


// executor(config,StateMap);

// console.log(config);

