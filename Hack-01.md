## Hack-01 Create WFE <-> Middle applications
---

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

