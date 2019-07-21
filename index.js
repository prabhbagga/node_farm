const http=require('http');
const url = require('url');
// const json = require('JSON');
const fs= require('fs');
var replace = require('./replace');
var obj = fs.readFileSync("data.json");
var jsonObj= JSON.parse(obj);
var templateProduct= fs.readFileSync("./product.html").toString();
var templateCard= fs.readFileSync("./cards.html").toString();
var templateOverview= fs.readFileSync("./overview.html").toString();
var makeCard = function(templateCard,json){
    return replace(templateCard,json)
};
const server=http.createServer(function(req,res){
   
    console.log("URL requested: "+req.url);
    var path=req.url;
    //Header
    // res.writeHead(200,{"content-type":"text/plain"});//200 is status code
    //Body
    // res.write("Hi we are serving from node server!");
    var id = url.parse(path,true).query.id;
    var path = url.parse(path,true).pathname;
    if(path=="/product"){
        var file = replace(templateProduct,jsonObj[id])
        res.writeHead(200,{"content-type":"text/html"});
        // console.log(file);
        res.end(file);
    }
    // else if(path=="/product?id=2"){
    //     var file = replace(templateProduct,jsonObj[2])
    //     res.writeHead(200,{"content-type":"text/html"});
    //     // console.log(file);
    //     res.end(file);
    // }
    // else if(path=="/product?id=1"){
    //     var file = replace(templateProduct,jsonObj[1])
    //     res.writeHead(200,{"content-type":"text/html"});
    //     // console.log(file);
    //     res.end(file);
    // }
    else if(path=="/"||path==="/overview"){
        var cards="";
        for(i in jsonObj){
            cards+=makeCard(templateCard,jsonObj[i]);
        }
        let overviewHtml=templateOverview.replace("{%PRODUCT_CARDS%}",cards);
        res.end(overviewHtml);
        
    }
    else if(path=="/api"){
        var obj= fs.readFileSync("./data.json");
        res.writeHead(200,{"content-type":"application/json"});
        res.end(obj);
    }
    else{
        res.writeHead(404);
        res.end("Error 404 page not found.");
    }
});
var port = process.env.PORT||80;
server.listen(port);
console.log(port);
//url for this is localhost:3000