
const functionComponent = require('./functions');
const config =  require('./config');

var StateMap = new Map();

var executor = function (config,StateMap) {
    
    
    var processNumberQueue = Object.keys(config);
    while (processNumberQueue.length > 0) {
        var processNumber = processNumberQueue.shift();

        var processObject = config[processNumber];

        var processInfo = Object.keys(processObject)[0];

        var functionType = processObject[processInfo].type;

        var arguments = processObject[processInfo].arguments;

        functionComponent[functionType][processInfo](arguments, StateMap);
    }


}
module.exports = executor


executor(config,StateMap);

console.log(config);

