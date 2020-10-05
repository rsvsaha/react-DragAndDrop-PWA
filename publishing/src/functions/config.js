var config = [
    {
        id:"id1",
        functionName:"createVariable",
        functionType:"BasicFunctions",
        functionArgs:["variable1"]
    },
    {
        id:"id2",
        functionName:"assignFunction",
        functionType:"BasicFunctions",
        functionArgs:["variable1", 5]

    }, 
    {
        id:"id3",
        functionName:"printFunction",
        functionType:"BasicFunctions",
        functionArgs:["variable1"]

    },    
    {
        id:"id4",
        functionName:"createVariable",
        functionType:"BasicFunctions",
        functionArgs:["variable2"]
    },
    {
        id:"id5",
        functionName:"assignFunction",
        functionType:"BasicFunctions",
        functionArgs:["variable2", 7]

    }, 
    {
        id:"id6",
        functionName:"printFunction",
        functionType:"BasicFunctions",
        functionArgs:["variable2"]

    },
    {   id:"id7",
        functionName:"ifElseBlock",
        functionType:"LogicBlocks",
        functionArgs:[
            {
                id:"id2",
                functionName:"executionBlock",
                functionType:"LogicBlocks",
                functionArgs:[{
                    id:"id1",
                    functionName:"greaterThan",
                    functionType:"LogicalFunctions",
                    functionArgs:["variable1", "variable2"]
                }]
            }, 
            , {
            id:"id2",
            functionName:"executionBlock",
            functionType:"LogicBlocks",
            functionArgs:require('./config2')
        }, {
            id:"id3",
            functionName:"executionBlock",
            functionType:"LogicBlocks",
            functionArgs: [{
                id:"id6",
                functionName:"printFunction",
                functionType:"BasicFunctions",
                functionArgs:["variable1"]
        
            }, {
                id:"id6",
                functionName:"printFunction",
                functionType:"BasicFunctions",
                functionArgs:["variable2"]
        
            }]

        }]
        
    },{
        id:"id8",
        functionName:"createVariable",
        functionType:"BasicFunctions",
        functionArgs:["variable3"]


    } , {
        id:"id9",
        functionName:"assignFunction",
        functionType:"BasicFunctions",
        functionArgs:["variable3", 6]

    },require('./foorLoopconfig'),
]

module.exports = config;