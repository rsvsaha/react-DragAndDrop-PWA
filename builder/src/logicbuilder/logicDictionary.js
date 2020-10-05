export const logicDictionary = {

    "BasicFunctions": {
        "createVariable": [{ type: "text", fieldName: "VariableName", hint: "Enter the variable name of the variable to be created" }],
        
        "assignFunction": [{ type: "text", fieldName: "VariableName", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableValue", hint: "Enter the variable value of the variable to be assigned" }],
        
        "assignToVariableFunction": [{ type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" }],
        
        "printFunction": [{ type: "text", fieldName: "VariableName", hint: "Enter the variable name whose value is to be the variable to be created" }]

    },

    "LogicBlocks" : {

        "ifElseBlock" : [{ type: "execution", fieldName: "condition", hint: "Enter the variable name of the variable to be created" },
        { type: "execution", fieldName: "ifBlock", hint: "Enter the execution workflow name of the if block to be executed" },
        { type: "execution", fieldName: "elseBlock", hint: "Enter the execution workflow name of the else block to be executed" }],
        
        "executionBlock": [{ type: "text", fieldName: "ExecutionblockName", hint: "Enter the execution workflow to be created" }]
    },

    "LogicalFunctions" : {
        "greaterThan": [{ type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" }],
        
        "lessThan": [{ type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" }],
        
        "greaterThanEqual": [{ type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" }],
        
        "lessThanEqual": [{ type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" }],
        
        "equalTo": [{ type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to be assigned" },
        { type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be assigned" }]
    },

    "LoopBlocks" : {

        "forLoop" : [{ type: "text", fieldName: "VariableNameFrom", hint: "Enter the variable name of the variable to be started(Iterator variable)" },
            { type: "text", fieldName: "VariableNameTo", hint: "Enter the variable name of the variable to which the loop will run" },
            { type: "execution", fieldName: "BodyBlock", hint: "Enter the execution workflow name of the body block to be executed" }]        

    },
    "NetworkBlocks" : {
        "networkGET" : [{ type: "text", fieldName: "UrlVariableName", hint: "Enter the variable name of the variable to be created" },
            { type: "text", fieldName: "Result", hint: "Enter the variable name of the variable to be created" },
            { type: "execution", fieldName: "ExecutionblockName", hint: "Enter the execution workflow to be created" }]
    }

}




