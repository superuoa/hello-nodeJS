var express = require('express');
var app = express();
var fs = require("fs"); //read file user.json example Data
var bodyParser = require('body-parser')

app.get('/getUsers',function(req,res){
    fs.readFile(__dirname+"/"+"user.json","utf-8",function(err,data){
        console.log(data);
        res.end(data);
    });
});
app.get('/getUser/:id',function(req,res){
    fs.readFile(__dirname+"/"+"user.json","utf-8",function(err,data){
        var users = JSON.parse(data);
        var user = users["user"+req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

var user = {
    "user4":{
        "name":"Will Smith",
        "password":"headshot",
        "position":"Actor",
        "id":4
     }
};

app.post('/addUser',function(req,res){
    fs.readFile(__dirname+"/"+"user.json","utf-8",function(err,data){
        data = JSON.parse(data);
        var jsonString = '';
        req.on('data', function (dataBody) {
            jsonString += dataBody;
        });
        req.on('end', function () {
            var user4 = JSON.parse(jsonString);
            data["user4"] = user4;
            res.end(JSON.stringify(data));
        });

        
    });
});

app.delete('/delUser/:id',function(req,res){
    fs.readFile(__dirname+"/"+"user.json","utf-8",function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.id];
        res.end(JSON.stringify(data));
    });
});

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s", host, port);

});

