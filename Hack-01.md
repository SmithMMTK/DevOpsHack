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

### Initilize parameter
```bash
export rg="azAKSvnet"
export aksvnet="azAKSvnet"
export akssubnet="azAKSsubnet"
export vnetaddress="192.168.0.0/16"
export vnetsubnet="192.168.1.0/24"
export akscluster="azAKSCluster"
export acr=azacr$randomId
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

### Create WFE server

- Create working directory

```bash
mkdir wfe
cd wfe
curl https://raw.githubusercontent.com/SmithMMTK/DevOpsHack/master/sources/wfe/app.js -o app.js
curl https://raw.githubusercontent.com/SmithMMTK/DevOpsHack/master/sources/wfe/package-lock.json -o package-lock.json
curl https://raw.githubusercontent.com/SmithMMTK/DevOpsHack/master/sources/wfe/package.json -o package.json
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

### Create Middle-tier server


### Create CLI server

---
