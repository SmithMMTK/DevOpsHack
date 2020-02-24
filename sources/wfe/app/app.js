var os = require("os")
var ip = require("ip");

var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request')
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var hostname = os.hostname();

 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(`Environment ${process.env.middle-server}`)
  // 
  // Get IP of middleserver
  // export middleserver=IP_ADDRESS_RETURN_FROM_MIDDLE_SERVER
  // get IP from docker run -p 3000:3000 CONTAINERIMAGE
  console.log("%s listening at %s:%s", hostname, ip.address(), port)
});
 
 
app.get('/form', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/post'  method='post' name='form1'>";
  html += "<p>Registration for DevOps Hack : BUILDNUMBER</p>";
  html += "<p>name:<input type= 'text' name='name'></p>";
  html += "<p>title:<input type='text' name='title'></p>";
  html += "<input type='submit' value='submit'>";
  html += "<INPUT type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/post', urlencodedParser, function (req, res){
//
// Update environment variable
// export middleserver=127.0.0.1
//
  request.post(`http://${process.env.middleserver}:3000/validate`, {
    json: {
      name : req.body.name,
      title : req.body.title
    }
    }, (error, res2, body) => {
    if (error) {
      console.error(error)
      return
    }
    else 
      {
          //res.send(`${res.body}`)
          var reply='';
          reply += "<p> Your name is: " + req.body.name + "</p>";
          reply += "<p> Your title is: " + req.body.title + "</p>";
          reply += "<p> Your registration is: " + res2.body + "</p>";
          
          console.log(`return body: ${reply}`)
          res.send(reply);
      }
  
    
    console.log(`statusCode: ${res.statusCode}`)
  
  })
  

 });