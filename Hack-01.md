## Hack-01 Create WFE <-> Middle applications
---
## Prepare environment parameter

### Get Random number
```bash
export randomId=$RANDOM
echo $randomId
```
__Write down randomId to use on following steps__
e.g. 26684
```bash
export randomIdstr=26684
```

### Initilize parameter
```bash
export rg="azAKSvnet"
export aksvnet="azAKSvnet"
export akssubnet="azAKSsubnet"
export vnetaddress="192.168.0.0/16"
export vnetsubnet="192.168.1.0/24"
export akscluster="azAKSCluster"
export acr=azacr$randomIdstr
export acrserver=$acr.azurecr.io
export middleserver=127.0.0.1
```

### Display parameter
```bash
echo $rg
echo $aksvnet
echo $akssubnet
echo $vnetaddress
echo $vnetsubnet
echo $akscluster
echo $acr
echo $acrserver
echo $middleserver
```
---

__*** Write down all parameters especially $acr and $acrserver ***__

---

## Create application servers

### Clone repo
```
git clone https://github.com/SmithMMTK/DevOpsHack 
```

### Create WFE server

- Create working directory

```bash
cd /DevOpsHack/sources/wfe/app
npm init -y
npm install -y
```

- Review code 
```javascript
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
```

- Run WFE server
```bash
node app.js
```

### Create Middle-tier server
- Create working directory
```bash
cd /DevOpsHack/sources/middle
npm init -y
npm install -y
```

- Review code 
```javascript
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
```

- Run middle server
```bash
node app.js
```

- Test WFE <-> middle

Open [http://localhost:8082/form:8082](http://localhost:8082/form:8082)

---
