const functionComponent = {
    
    "BasicFunctions" : {
    "createVariable": function(args,stateMap) {
        var variable=null; 
        stateMap.set(args[0],variable);
        
    },
    "assignFunction": function(args,stateMap) {

        var val = args[1];
        stateMap.set(args[0],val);
    },
    "assignToVariableFunction": function(args,stateMap) {
        var from = stateMap.get(args[0]);
        stateMap.set(args[1],from);
    },
    "printFunction": function (args,stateMap) {
        // console.log(stateMap.values());
        console.log(stateMap.get(args[0]));}
    
    },

    "LogicBlocks" :{

        "ifElseBlock" : function (args,stateMap)  { 
            var result = blocksExecutor(args[0],stateMap);
            if(result ) {
                blocksExecutor(args[1],stateMap);
              
            }else{
                blocksExecutor(args[2],stateMap);
                
            } 
        },
        "executionBlock": function(args,stateMap) {
            const executor = require('./executor');
            executor(args,stateMap);
            
        }
    


    },

    "LogicalFunctions" :{
        "greaterThan":function (args,stateMap) { return ( stateMap.get(args[0]) > stateMap.get(args[1]) ) ? true : false;} ,
        "lessThan": function (args,stateMap) {return (stateMap.get(args[0]) < stateMap.get(args[1])) ? true : false;},
        "greaterThanEqual":function (args,stateMap) {return (stateMap.get(args[0]) >= stateMap.get(args[1])) ? true : false;},
        "lessThanEqual":function (args,stateMap) {return (stateMap.get(args[0]) <= stateMap.get(args[1])) ? true : false;},
        "equalTo": function (args,stateMap) { return (stateMap.get(args[0]) === stateMap.get(args[1])) ? true : false;}
    },

    "LoopBlocks" : {

        "forLoop" : function (args,stateMap) {
            var start = stateMap.get(args[0]);
            var end= stateMap.get(args[1]);
            for(let i=start ; i <= end; i++) {
                stateMap.set(args[0],i);
                blocksExecutor(args[2],stateMap);
            }

        }





    }
}




const blocksExecutor = function(arg,stateMap){
                var executeCode = arg;
                var process = Object.keys(executeCode)[0];
                var processInfo = executeCode[process];
                var functionType = processInfo.type;
                var arguments = processInfo.arguments;
                return functionComponent[functionType][process](arguments, stateMap);
}

module.exports = functionComponent;