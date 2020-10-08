import { executor } from './executor';

export const functionComponent = {
    
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
            // console.log(result);
            if(result ) {
                blocksExecutor(args[1],stateMap);
              
            }else{
                blocksExecutor(args[2],stateMap);
                
            } 
        },
        "executionBlock": function(args,stateMap) {
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

    },
    "NetworkBlocks" : {
        "networkGET" : function(args,stateMap) {
        //    networkGET()
        }
        

    },
    "MathBlocks" : {
        "evaluateMath": function(args,stateMap) {
            var expression = stateMap.get(args[0]);
            var numberStack = [];
            var operatorStack = [];
            const applyOperation = function (numberLeft,numberRight,operator) {
                switch(operator) {
                    case '+':
                        {let opresult = numberLeft + numberRight;
                        return opresult;}
                    case '-':
                        {
                            let opresult = numberLeft - numberRight;
                            return opresult;
                        }
                        
                    case '*':
                        {let opresult = numberLeft * numberRight;
                        return opresult;}
                    case '/':
                        {if (numberRight === 0) {
                            throw(new Error('Cannot Divide by 0 expression'));
                        }
                        let opresult = numberLeft / numberRight;
                        return opresult;
                        }
                
                }
                return 0;
            }
        
            const checkCurrentPrecedence = function (currentOperator,opertorStackTopOperator) {
                if(opertorStackTopOperator === '(' || opertorStackTopOperator === ')'){
                    return true;
                }
                else if( (currentOperator === '/' || currentOperator === '*' ) && (opertorStackTopOperator === '+' || opertorStackTopOperator === '-')){
                    return true;
                }
                return false; 
            }
        
        
        
            try {
                for(let i=0;i< expression.length;i++) {
                    let token = expression[i];
                    if(token === ' '){
                        continue;
                    }
        
                    else if(token === ')'){
                        let operator = operatorStack.pop();
                        while(operator !== '('){
                        let numberRight = numberStack.pop();
                            let numberLeft = numberStack.pop();
                            
                            let result = applyOperation(numberLeft,numberRight,operator);
                            numberStack.push(result);
                            operator = operatorStack.pop();
                            
                        }
                        
        
                     }
                     else if(token === '(') {
                         operatorStack.push(token); 
                     }
                     else if (token === "+" || token === "-" || token === "/" || token === '*') {
                        while((!(operatorStack.length === 0)) && (!checkCurrentPrecedence(token,operatorStack[operatorStack.length - 1]))){
                            let operator = operatorStack.pop();
                            let numberRight = numberStack.pop();
                            let numberLeft = numberStack.pop();
                            let result = applyOperation(numberLeft,numberRight,operator);
                            numberStack.push(result);
                            
                        }
        
                        operatorStack.push(token);
                    }
                    else {
                        let decimalDetected = false;
                        while( (i<=(expression.length - 2) && expression[i+1]>=0 && expression[i+1]<=9) || 
                        (i<=(expression.length - 2) && expression[i+1] === '.')){
                            if(expression[i+1] === '.' && !decimalDetected){
                                decimalDetected = true;
                            }else if(expression[i+1] === '.' && decimalDetected){
                                throw(new Error("Error in expression"))
                            }
                            i+=1;
                            token += expression[i];
        
                        }
                        let num = parseFloat(token);
                        numberStack.push( num);
                    }
                    
                }
                while(!(operatorStack.length === 0)){
                    let operator = operatorStack.pop();
                    let numberRight = numberStack.pop();
                    let numberLeft = numberStack.pop();
                    let result = applyOperation(numberLeft,numberRight,operator);
                    numberStack.push(result);
                    
                }
        
            } catch (error) {
                console.log(error);
                stateMap.set(args[1],result);   
            }
        
            let result = numberStack.pop();
            stateMap.set(args[1],result);
        
        
        } 
    }



}




export const blocksExecutor = function(arg,stateMap){
                var processObject = arg;
                var processId = processObject.id;
                var functionName = processObject.functionName;
                var functionType = processObject.functionType;
                var functionArguments = processObject.functionArgs;
        return functionComponent[functionType][functionName](functionArguments, stateMap);
}

