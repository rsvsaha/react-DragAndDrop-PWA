var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs'); 

var path = require('path');

var serveIndex = require('serve-index');
var glob =  require('glob');
var archiver = require('archiver');

var expressfavicon= require('express-favicon');



var getDirectories =function(src) {
    return new Promise(function(resolve,reject){
        glob(src+'/**/*', function(err,result){
            if(err){
                reject(err);
            }else {
                // console.log(result);
                resolve(result);
            }
        });
    
    });
}        


app.use(expressfavicon(__dirname + "/build/d&dlogo64.png"))
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,"build")))

app.use('/apps', serveIndex(path.join(__dirname,"apps")));
app.use("/apps",express.static(path.join(__dirname,"apps")));

app.get("/test",function(req,res){
    res.send("Running")
});

app.get("/open/:appName",(req,res)=>{

    var appName = req.params["appName"];
    try {
        if(!fs.existsSync(path.join(__dirname,"apps",appName))){
            fs.mkdirSync(path.join(__dirname,"apps",appName));
            fs.mkdirSync(path.join(__dirname,"apps",appName,"designs"));
            fs.writeFileSync(path.join(__dirname,"apps",appName,"designs","AppDesign.json"),JSON.stringify([]));
            fs.mkdirSync(path.join(__dirname,"apps",appName,"workFlows"));
            fs.writeFileSync(path.join(__dirname,"apps",appName,"workFlows","appInit.json"),JSON.stringify([]));
            fs.writeFileSync(path.join(__dirname,"apps",appName,"sw.js"),"");
            
        }
        res.send(appName);    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    


});




app.post("/saveDesign/:appName",(req,res)=>{

    try {
        var appName = req.params["appName"];
        var fileName = path.join(__dirname,"apps",appName,"designs","AppDesign.json");
        
    fs.writeFileSync(fileName,JSON.stringify(req.body));

    res.send(true);
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);        
    }
    

});


app.get("/getDesign/:appName",(req,res)=>{
    try {
        var appName = req.params["appName"];
        var fileName = path.join(__dirname,"apps",appName,"designs","AppDesign.json");
        
        var config = fs.readFileSync(fileName);
    res.send(JSON.parse(config));
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
});



app.get("/getWorkflow/:appName/:workflowName/",(req,res)=>{
    try {
    var appName = req.params["appName"];
    var workflowName = req.params["workflowName"]+".json";
    var fileName = path.join(__dirname,"apps",appName,"workFlows",workflowName);
    var config = fs.readFileSync(fileName);
    
    res.send(JSON.parse(config));
    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
});


app.post("/saveWorkflow/:appName/:workflowName",(req,res)=>{
    
    try {
        var appName = req.params["appName"];
        var workflowName = req.params["workflowName"]+".json";
        var fileName = path.join(__dirname,"apps",appName,"workFlows",workflowName);
        
        var config = req.body;
        fs.writeFileSync(fileName,JSON.stringify(config));

        res.send(true);
        
    } catch (error) {
        console.log(error);
        
        res.sendStatus(500);
    }
    
});


app.get("/getServiceWorker/:appName",(req,res)=>{
    try {
        
        var appName = req.params["appName"];
        var filePath =path.join(__dirname,"apps",appName).toString();
        fs.unlinkSync(path.join(__dirname,"apps",appName,"sw.js"));

        getDirectories(filePath).then(function(result){
            let filespath = result.map(function(value){
                return "\'"+value.split(appName)[1]+"\'";
            });
            var swFile = fs.readFileSync(path.join(__dirname,"apps","sw.txt"),'utf8');
            // console.log(swFile);
            swFile = swFile.replace('STATICFILES',filespath.join(",\n")).replace('CREATEDAT',"'"+new Date().toUTCString()+"'");
            fs.writeFileSync( path.join(__dirname,"apps",appName,"sw.js"),swFile);
            // swFile = fs.readFileSync(__dirname,"apps",appName,"sw.js");

            res.send(new Date.toString());
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        });
        
          
    } catch (error) {
        console.log(error);
        res.send(error);
    }


});


app.get("/downloadAppFiles/:appName",(req,res)=>{
    try {
        var appName = req.params["appName"];
        var output = fs.createWriteStream("AppData.zip");
        var archive = archiver('zip');
        var dirPath =path.join(__dirname,"apps",appName);

        output.on('close', function () {
            res.download("AppData.zip");
            
        });

    archive.on('error', function(err){
        res.send(err);
    });

    archive.pipe(output);

    // append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
    archive.directory(dirPath, false);
    archive.finalize();
    
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
});



app.get('/*', function (req, res) {
    try {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));    
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
});







app.listen(process.env.PORT || 8085,function(){
    console.log("Started at Application");
});