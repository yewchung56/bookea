var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  //console.log(queryData.id);

  //console.log(url.parse(_url, true).pathname);

  if (pathname === "/") {
    //메인 화면
    if (queryData.id === undefined) {
      var filename = ["회원가입", "로그인"];
      fs.readdir("./data", function (err, filelist) {
        console.log(filelist);
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
            @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
            body {
              background: #f3dc63;
            }
            h1 {
              padding-left: 40px;
              padding-top: 30px;
              text-align: center;
              justify-content: center;
              text-decoration-line: none;
              color: #2358e1;
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
            }
            
            h1 > a{ 
              justify-content : center;
              text-decoration-line: none;
              color: #2358e1;
              font-size: 80px;
              font-family: 'Comfortaa', cursive;
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
          <title>BOOKEA</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">BOOKEA</a></h1>
          
          
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
            list +
            `<a style="width: 20px;
            height: 20px;
            
            text-decoration-line: none;


            margin-left:10px;"href="/?id=${filelist[i]}">${filelist[i]}</a>`;
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
      <style>
            @import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');
            body {
              background: #f3dc63;
            }
            h1 {
              margin-top: 0px;
              font-size: 50px;
              font-family: 'Comfortaa', cursive;
            }
            h1 > a{
              text-decoration-line: none;
            }
            .icon {
              margin: auto;
              
            }
            h1 > a:visited {
              color: #2358e1;
            }
            
      </style>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">BOOKEA</a></h1>
        
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
  } else if (pathname === "/create_account") {
    var body = "";
    request.on("data", function (data) {
      //웹 브라우저가 post로 데이터를 전송하면 엄청난 큰 데이터 일 때를 대비해서 이런 사용방법 제공 어떤 특정한 양의 조각들을 수신할 때마다 서버는 callback함수를 호출하도록 함
      body = body + data; //body에 callback이 실행될 때마다 데이터를 추가
    });
    request.on("end", function () {
      //들어올 정보가 더이상 없을 때 end에 해당되는 callback이 수신되었을 때 정보가 끝났음을 알 수 있음
      var post = qs.parse(body); //parse 함수를 통해 정보를 객체화
      var id = post.id;
      console.log(post.id); //post를 통해 전송된 데이터를 가져올 수 있음
      console.log(post.password);
      console.log(post.passwordchk);
    });
    response.writeHead(302, { Location: "/?id=Login" }); //로그인 페이지로 이동 or 홈으로 이동?
    response.end("success");
  } else if (pathname === "/login") {
    var body = "";
    request.on("data", function (data) {
      //웹 브라우저가 post로 데이터를 전송하면 엄청난 큰 데이터 일 때를 대비해서 이런 사용방법 제공 어떤 특정한 양의 조각들을 수신할 때마다 서버는 callback함수를 호출하도록 함
      body = body + data; //body에 callback이 실행될 때마다 데이터를 추가
    });
    request.on("end", function () {
      //들어올 정보가 더이상 없을 때 end에 해당되는 callback이 수신되었을 때 정보가 끝났음을 알 수 있음
      var post = qs.parse(body); //parse 함수를 통해 정보를 객체화
      var id = post.id;
      console.log(post.id); //post를 통해 전송된 데이터를 가져올 수 있음
      console.log(post.password);
    });
    response.writeHead(302, { Location: "/?id=MainPage" }); //로그인 페이지로 이동 or 홈으로 이동?
    response.end("success");
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(4000);
