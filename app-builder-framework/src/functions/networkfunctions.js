import {blocksExecutor} from './functions';
import axios from 'axios';

export const networkGET = function (args,stateMap) {
    var url = stateMap.get(args[0]);    
    axios.get(url).then((result)=>{
        var data = result.data; 
        stateMap.set(args[1],data);
        blocksExecutor(args[2],stateMap);
    });
} 