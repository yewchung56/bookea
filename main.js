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
      var filename = ["회원가입", "로그인"];
      fs.readdir("./data", function (err, filelist) {
        console.log(filelist);
        var title = "여러분의 책을 기록하세요~";
        //var description = "Hello, Bookea!!";

        var list = "<ul>";
        var i = 0;

        while (i < 2) {
          list =
            list +
            `<div class="list"><a href="/?id=${filelist[i]}">${filename[i]}</a></div><br>`; //주소 값을 data의 파일이름으로 받아서 한글 이름으로 출력
          i = i + 1;
        }
        list = list + "</ul>"; //파일 이름 받아서 반복문으로 목록을 출력

        var template = `
          <!doctype html>
        <html>
        
        <head>
          <style>
            body {
              background: #f3dc63;
            }
            h1 {
              padding-top: 30px;
              text-align: center;
              justify-content: center;
              text-decoration-line: none;
              color: #2358e1;
            }
            h2{
              text-align: center;
              padding-bottom: 80px;
            }
            .list{
              justify-content : center;
              text-align: center;
              margin:0 auto; 
              width: 1000px;
              height: 30px;
              border: 1px solid blue;
              border-radius: 30px;
              display: flex;
              justify-content: center;
              vertical-align: middle;
            }
            
            h1 > a{ 
              text-decoration-line: none;
              color: #2358e1;
              font-size: 70px;
            }
            .list > a{
              padding-top: 5px;
              justify-content : center;
              text-decoration-line: none;
              font-size: 20px;
            }
            div{
              justify-content : center;
              text-align: center;
              margin:0 auto; 
            }
          </style>
          <title>Bookea - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">Bookea</a></h1>
          <h2>${title}</h2>
          
          ${list}
          
          
          
        </body>
        </html>
    
      `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        console.log(filelist);
        var list = "<ul>";
        var i = 0;
        while (i < filelist.length) {
          list =
            list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + "</ul>"; //파일 이름 받아서 반복문으로 목록을 출력
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
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
        ${list}
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      
        `;
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(4000);
