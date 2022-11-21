var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  //console.log(queryData.id);

  //console.log(url.parse(_url, true).pathname);

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var title = "Welcome";
        var description = "Hello, Bookea!!";
        var template = `
      <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Bookea</a></h1>
      <h2>${title}</h2>
      <p>${description}</p>
      <ul>
        <li><a href="/?id=Join">회원가입</a></li>
        <li><a href="/?id=Login">로그인</a></li>
        <li><a href="/?id=MainPage">메인화면</a></li>
      </ul>
      
    </body>
    </html>
    
      `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var title = queryData.id;
        var template = `
      <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Bookea</a></h1>
      <ul>
        <li><a href="/?id=Join">회원가입</a></li>
        <li><a href="/?id=Login">로그인</a></li>
        <li><a href="/?id=MainPage">메인화면</a></li>
      </ul>
      <h2>${title}</h2>
      <p>${description}</p>
    </body>
    </html>
    
      `;
        console.log(description);
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(4000);
