const express = require('express')
var os = require("os")
var ip = require("ip")
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())
app.use(morgan('dev'))
var hostname = os.hostname();

app.use((req,res,next) =>{
    console.log(`${req.method}, ${req.url}`)
    next()
})

//const data = '{"name":"SmithM","title":"CSA"}'

app.post('/validate',(req,res)=>{
    //console.log(req.body)
    //res.send(req.body)
    
    try {
        console.log(req.body)
      } catch(err) {
        console.error(err)
      }
    
    //let jsonobj = JSON.stringify(req.body)
    
    var approval = "reject"

  
    if (req.body.title.toLowerCase() == 'csa') {
      approval = "accepted"
    
    } else {
      approval = "rejected"
    }
    
    console.log(`approval status: ${approval}`)
    
    res.send(approval)
    
})

// app.use((error,req, res,next) => {
//    res.status(500).send(error)
//})

// Example command to call:
// curl -d '{"name": "smith","title": "CSA"}' http://localhost:3000/validate -i -H 'Content-Type: application/json'
//

var server = app.listen(3000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("%s listening at %s:%s", hostname, ip.address(), port)
})

