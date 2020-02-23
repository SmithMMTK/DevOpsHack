 ## Hack-06 Compose it together
---

### Review BUILDNUMBER for CICD

Review deployment file [wfe-aks-vnet.yaml](/sources/wfe/kubefiles/wfe-cicd.yaml)

```yaml
      containers:
      - name: multi-wfe
        image: azsmi15acr.azurecr.io/multi-wfe:BUILDNUMBER
        resources:
```

---

### Create new DevOps project

![href](/images/cicd00001.png)

---

### Create Branch for WFE

![href](/images/cicd00002.png)
![href](/images/cicd00003.png)


```bash
git clone URL.git
```
![href](/images/cicd00004.png)

Copy wfe folder to git folder



---

### Create Build Pipeline

![href](/images/cicd00005.png)
![href](/images/cicd00006.png)
![href](/images/cicd00007.png)

![href](/images/cicd00008.png)

- Update BUILDNUMBER in Build pipeline
```bash
echo 'Update build number'
sed -i 's/BUILDNUMBER/$(Build.BuildId)/g' kubefiles/wfe-cicd.yaml
sed -i 's/BUILDNUMBER/$(Build.BuildId)/g' app/app.js

cat kubefiles/wfe-cicd.yaml
echo '--------------'
cat app/app.js
```

![href](/images/cicd00009.png)
![href](/images/cicd00010.png)
![href](/images/cicd00011.png)
![href](/images/cicd00012.png)


---

### Create Release Pipeline


![href](/images/cicd00013.png)
![href](/images/cicd00014.png)
![href](/images/cicd00015.png)
![href](/images/cicd00016.png)
![href](/images/cicd00017.png)


---