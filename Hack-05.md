## Hack-05 Kubenetes cluster operation and applications deployment
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

### Kubenetest basic commands

Previous step : [Create AKS on VNET](https://github.com/SmithMMTK/DevOpsHack/blob/master/Hack-03.md#create-aks-on-vnet)

- Get AKS context
```bash
kubectl config get-contexts
#kubectl config use-context CONTEXT_NAME
```

- Get AKS Pods, Services and Deployments
```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

- Push Docker image to ACR
```bash
docker images

docker tag multi-wfe $acrserver/multi-wfe:v1
docker push $acrserver/multi-wfe:v1

az acr repository list --name $acr --output table
az acr repository show-tags --name $acr --repository multi-wfe --output table

```

### Working with deployment file

Review deployment file [wfe-aks.yaml](/sources/wfe/kubefiles/wfe-ake.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: multi-wfe
spec:
  replicas: 3
  selector:
    matchLabels:
      app: multi-wfe
  template:
    metadata:
      labels:
        app: multi-wfe
    spec:
      containers:
      - name: multi-wfe
        image: azsmi15acr.azurecr.io/multi-wfe:v1
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 250m
            memory: 256Mi
        ports:
        - containerPort: 80
        env:
        - name: middleserver
          value: "smi15middle.southeastasia.cloudapp.azure.com"
---
apiVersion: v1
kind: Service
metadata:
  name: multi-wfe
spec:
  type: LoadBalancer
  ports:
  - port: 8082
  selector:
    app: multi-wfe
```

Replace ACR container image to your acr server

```bash
echo $acrserver
```

*** Ignore middleserver URL, we will cover it later ***

Deploy application

```bash
kubectl apply -f wfeAKS.yaml
# kubectl delete all --selector app=multi-wfe
kubectl get pods
kubectl get services
```

---

### Create Ubuntu VM and deploy Middle server 

- Quickstart: Create a Linux virtual machine in the Azure portal 
[Link](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal)

- Deploy Middle server into this VM

SSH into VM

```bash

git clone https://github.com/SmithMMTK/DevOpsHack 

cd /DevOpsHack/sources/middle
npm init -y
npm install -y
run app.js
```

### Change Middle server connection IP Address

Switch desktop and get Ubuntu server IP Address

```bash
az vm list -d -o table

```

Allow incomming request to PORT 3000

![href](/images/allownsg.png)


[Reference](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/nsg-quickstart-portal)


Modify deployment file [wfe-aks.yaml](/sources/wfe/kubefiles/wfe-ake.yaml) in middle server portion to reflect to VM IP address
```yaml
        - name: middleserver
          value: "smi15middle.southeastasia.cloudapp.azure.com"
```

### Optional (Deploy internal loadbalance by VNET IP address)

Review deployment file [wfe-aks-vnet.yaml](/sources/wfe/kubefiles/wfe-aks-vnet.yaml)

```yaml
spec:
  loadBalancerIP: 192.168.1.100
  type: LoadBalancer
  ports:
  - port: 8082
  selector:
    app: multi-wfe
```

```bash
kubectl apply -f wfe-aks-vnet.yaml
```

### Optional Hack 

Create Deployment file and deploy middle to cluster
