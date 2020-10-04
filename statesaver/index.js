var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs'); 

var path = require('path');



app.use(cors());
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false,limit:'50mb'}));
app.use("/designs",express.static(path.join(__dirname,"designs")));
app.use("/workFlows",express.static(path.join(__dirname,"workFlows")));

app.get("/",function(req,res){
    res.send("Running")
});


app.post("/saveDesign/:designid",(req,res)=>{

    try {
        var designid = req.params["designid"]+".json";
        var fileName = path.join(__dirname,"designs",designid);
        
    fs.writeFileSync(fileName,JSON.stringify(req.body));

    res.send(true);
    
    } catch (error) {
        res.sendStatus(500);        
    }
    

});


app.get("/getDesign/:designid",(req,res)=>{
    try {
        var designid = req.params["designid"]+".json";
        var fileName = path.join(__dirname,"designs",designid);
        
        var config = fs.readFileSync(fileName);
    res.send(JSON.parse(config));
    
    } catch (error) {
        res.sendStatus(500);
    }
    
});



app.get("/getWorkflow/:workflowName",(req,res)=>{
    try {
    var workflowName = req.params["workflowName"]+".json";
    var fileName = path.join(__dirname,"workFlows",workflowName);
 
    var config = fs.readFileSync(fileName);

    res.send(JSON.parse(config));
    
    } catch (error) {
        res.sendStatus(500);
    }
    
});


app.post("/saveWorkflow/:workflowName",(req,res)=>{
    
    try {
        var workflowName = req.params["workflowName"]+".json";
    var config = req.body;
    // console.log(config);
    var fileName = path.join(__dirname,"workFlows",workflowName);
    fs.writeFileSync(fileName,JSON.stringify(config));

    res.send(true);
    
    } catch (error) {
        res.sendStatus(500);
    }
    
});







app.listen(8085,function(){
    console.log("Started at 8085");
});