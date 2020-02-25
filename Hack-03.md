## Hack-03 Containerize Delployment (ACR, AKS)
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

### Create ACR

```bash
az group create --name $rg --location southeastasia

az acr create --resource-group $rg --name $acr --sku Basic
az acr login --name $acr
```

---

### Create VNET
```bash

az network vnet create \
    --resource-group $rg \
    --name $aksvnet \
    --address-prefixes $vnetaddress \
    --subnet-name $akssubnet \
    --subnet-prefix $vnetsubnet

```

### Create AD SP 

> Note: Ensure user has Application Developer role assignment in Azure Active Directory

```bash
az ad sp create-for-rbac --skip-assignment

```

```json
{
  "appId": "xxxx",
  "displayName": "yyy",
  "name": "zzz",
  "password": "pwdpwdpwd",
  "tenant": "ididididid"
}
```

```bash
export appId="xxx"
export appPwd="pwdpwdpwd"
```


### get the required resource IDs

```bash
VNET_ID=$(az network vnet show --resource-group $rg --name $aksvnet --query id -o tsv)
SUBNET_ID=$(az network vnet subnet show --resource-group $rg --vnet-name $aksvnet --name $akssubnet --query id -o tsv)

echo $VNET_ID
echo $SUBNET_ID

az role assignment create --assignee $appId --scope $VNET_ID --role Contributor
```

### Create AKS on VNET

```bash
az aks create \
    --resource-group $rg \
    --name $akscluster \
    --node-count 3 \
    --network-plugin kubenet \
    --service-cidr 10.0.0.0/16 \
    --dns-service-ip 10.0.0.10 \
    --pod-cidr 10.244.0.0/16 \
    --docker-bridge-address 172.17.0.1/16 \
    --vnet-subnet-id $SUBNET_ID \
    --service-principal $appId \
    --client-secret $appPwd \
    --attach-acr $acr

az aks get-credentials --resource-group $rg --name $akscluster

``` 

### Connect to the cluster

```bash
az aks install-cli
az aks get-credentials --resource-group $rg --name $akscluster
kubectl get pods
kubectl get services
```

### Run the appliction

Create azure-vote.yaml file

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: azure-vote-back
spec:
  replicas: 1
  selector:
    matchLabels:
      app: azure-vote-back
  template:
    metadata:
      labels:
        app: azure-vote-back
    spec:
      nodeSelector:
        "beta.kubernetes.io/os": linux
      containers:
      - name: azure-vote-back
        image: redis
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 250m
            memory: 256Mi
        ports:
        - containerPort: 6379
          name: redis
---
apiVersion: v1
kind: Service
metadata:
  name: azure-vote-back
spec:
  ports:
  - port: 6379
  selector:
    app: azure-vote-back
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: azure-vote-front
spec:
  replicas: 1
  selector:
    matchLabels:
      app: azure-vote-front
  template:
    metadata:
      labels:
        app: azure-vote-front
    spec:
      nodeSelector:
        "beta.kubernetes.io/os": linux
      containers:
      - name: azure-vote-front
        image: microsoft/azure-vote-front:v1
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
        - name: REDIS
          value: "azure-vote-back"
---
apiVersion: v1
kind: Service
metadata:
  name: azure-vote-front
spec:
  type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: azure-vote-front
```

```bash
kubectl apply -f azure-vote.yaml
```

### Test application
```bash
kubectl get service azure-vote-front --watch

```

![href](https://docs.microsoft.com/en-us/azure/aks/media/container-service-kubernetes-walkthrough/voting-app-deployed-in-azure-kubernetes-service.png)



