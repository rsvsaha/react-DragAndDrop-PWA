var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs'); 

app.use(cors());
app.use(bodyparser.json());

app.get("/",function(req,res){
    res.send("Running")
});

app.get("/getWorkflow/:workflowName",(req,res)=>{

    var workflowName = req.params["workflowName"]+".json";
    var config = fs.readFileSync(workflowName);

    res.send(JSON.parse(config));

});

app.post("/saveWorkflow/:workflowName",(req,res)=>{

    var workflowName = req.params["workflowName"]+".json";
    var config = req.body;
    console.log(config);
    fs.writeFileSync(workflowName,JSON.stringify(config));

    res.send(true);

});



app.listen(8085,function(){
    console.log("Started at 8085");
});