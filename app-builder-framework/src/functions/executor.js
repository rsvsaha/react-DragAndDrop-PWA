
import {functionComponent} from './functions';

var StateMap = new Map();

export const executor = function (config,StateMap) {
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


// executor(config,StateMap);

// console.log(config);

