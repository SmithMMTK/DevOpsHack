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



---

### Create Branch for WFE


```bash
git clone URL.git
```

---

### Create Build Pipeline


- Update BUILDNUMBER in Build pipeline
```bash
echo 'Update build number'
sed -i 's/BUILDNUMBER/$(Build.BuildId)/g' kubefiles/wfe-cicd.yaml
sed -i 's/BUILDNUMBER/$(Build.BuildId)/g' app/app.js

cat kubefiles/wfe-cicd.yaml
echo '--------------'
cat app/app.js
```

---

### Create Release Pipeline


---