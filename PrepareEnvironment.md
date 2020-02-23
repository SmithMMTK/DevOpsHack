## Prepare Environment (Azure Subscription, VS Code, AZ CLI, Nodejs, Docker)
---
### Install the Visual Studio Code

Visual Studio Code : Free Built on open source Runs everywhere [https://code.visualstudio.com](https://code.visualstudio.com)

### Install the Nodejs

Download the Node.js source code or a pre-built installer for your platform, and start developing today: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Install the Docker
Docker Engine is available on a variety of Linux platforms, Mac and Windows through Docker Desktop, Windows Server, and as a static binary installation: [https://docs.docker.com/install/](https://docs.docker.com/install/)

### Install the Azure CLI

The Azure CLI is available to install in Windows, maxOS and Linux environments. It can also be run in a Docker container and Azure Cloud Shell: [https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

---

### Sign in to Azure by Azure CLI
The Azure CLI's default authentication method uses a web browser and access token to sign in
```bash
az login
```

### Change the active subscription
To access the resources for a subscription, switch your active subscription or use the --subscription argument. 
```bash
az account list --output table
```
Name                                        | CloudName    | SubscriptionId                        | State    | IsDefault
--- | --- | --- | --- | ---
Azure Subscription 01 | AzureCloud | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  | Enable | True
Azure Subscription 02 | AzureCloud | yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  | Enable | True

```bash
az account set --subscription "Azure Subscription 02"
az group list -o table
```
