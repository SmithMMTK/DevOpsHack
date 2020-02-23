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

### Create VNET
```bash

az group create --name $rg --location southeastasia


az network vnet create \
    --resource-group $rg \
    --name $aksvnet \
    --address-prefixes $vnetaddress \
    --subnet-name $akssubnet \
    --subnet-prefix $vnetsubnet

```

### Create AD SP 
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



