var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

/*
The http.createServer() method turns your computer into an HTTP server.

The http.createServer() method creates an HTTP Server object.

The HTTP Server object can listen to ports on your computer and execute
a function, a requestListener, each time a request is made.
 */
http.createServer(function (req, res) {
    console.log(req.url);
    var extensionName = path.extname(req.url);
    console.log(extensionName);
    var destinationPath;
    switch(extensionName)
    {
        case '.html':
            destinationPath='./html'+req.url;
            break;
        case '.css':
            destinationPath='./css'+req.url;
            break;
        case '.js':
            destinationPath='./js'+req.url;
            break;
        case '.jpg':
        case '.png':
            destinationPath='./images'+req.url;
            break;
        default:
            destinationPath=req.url;
    }
    console.log(destinationPath);
    var mimeType={
        '.html': 'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif'

    };
    var contentType = mimeType[extensionName] || 'application/octet-stream';
    fs.readFile(destinationPath, function (err,data) {
        /*
        If error reading (or finding) the file
         */
         if (err) {
             /*404 CASE*/
             console.log("Inside 404");
             if (err.code == 'ENOENT') {
                fs.readFile('./html/pageUnderConstruction.html',function(error ,datas) {
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.end(datas);
                });
            }
            else {
                 res.writeHead(404);
                 res.end(JSON.stringify(err));
                 return;
             }
         }
        /*
        Return the contents of the file
         */
        console.log("Extension name and content Type below");
        console.log(extensionName);
        console.log(contentType);
        res.writeHead(200,{'Content-Type': contentType});//contentType gets last one like js/html
        res.end(data);
    });
}).listen(8080);
