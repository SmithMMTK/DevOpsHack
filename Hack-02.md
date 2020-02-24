## Hack-02 Containerize (Docker)
---
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
[How to initialize?](https://github.com/SmithMMTK/DevOpsHack/blob/master/Hack-01.md#prepare-environment-parameter)

--- 

### Create WFE container image

- Open and review dockerfile [/sources/wfe/dockerfile](/sources/wfe/app/dockerfile)
```dockerfile
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082
CMD [ "node", "app.js" ]
```

- Build docker image

```bash
docker build -t multi-wfe .
docker images
```

- Run docker
```
docker run -d -p 8082:8082 multi-wfe 
open http://localhost:8082/form
```

```bash
cd ..\sources\middle\
docker build -t multi-middle .
docker images
docker run -p 3000:3000 multi-middle
```


- Export middleserver IP address
```bash
export middleserver=IPADDRSS_OF_MIDDLE_SERVER
```

__Do not user 127.0.0.1 of IPADDRSS_OF_MIDDLE_SERVER__

- Option (debuging container)
```bash
#docker run -it multi-wfe bash
#docker ps
#docker container stop {id}
```


---

### Terminal to container
```bash
docker run -it multi-wfe bash
curl -d '{"name": "smith","title": "CSA"}' http://127.0.0.1:3000/validate -i -H 'Content-Type: application/json'

```

### Enable IP forward
```bash
sudo sysctl -w net.inet.ip.forwarding=1
```
