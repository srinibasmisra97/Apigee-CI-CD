# Apigee-CI-CD

This repository contains all the required scripts and files to deploy Apigee proxies and resources using Jenkins.

## Prerequisites

Following npm modules need to be setup:
1. [apigeelint](https://github.com/apigee/apigeelint)
2. [apickli](https://www.npmjs.com/package/apickli)
3. [apigeetool](https://www.npmjs.com/package/apigeetool)

## Basic Commands

### Generating OAuth Token

```bash
curl \
-H "Content-Type:application/x-www-form-urlencoded;charset=utf-8" \
-H "Accept: application/json;charset=utf-8" \
-H "Authorization: Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0" \
-X POST \
https://login.apigee.com/oauth/token \
-d "grant_type=password&username=username@example.com&password=password"
```

### Download Proxy Revision

[Reference.](https://apidocs.apigee.com/docs/api-proxies/1/routes/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/get)

To download proxy revision (utilizing basic authentication):
```bash
curl \
  'https://api.enterprise.apigee.com/v1/organizations/[ORG_NAME]/apis/[API_NAME]/revisions/[REVISION_NUMBER]?format=bundle' \
  --header 'Authorization: Basic [YOUR_AUTH_INFO]' -o [filename].zip
```

To download using OAuth 2.0 token:
```bash
curl \
  'https://api.enterprise.apigee.com/v1/organizations/[ORG_NAME]/apis/[API_NAME]/revisions/[REVISION_NUMBER]?format=bundle' \
  --header 'Authorization: Bearer [OAUTH_TOKEN]' -o [filename].zip
```

### Deploy Proxy

[Reference.](https://www.npmjs.com/package/apigeetool#deployproxy)

```bash
apigeetool deployproxy \
--organization [ORG_NAME] \
--environments [ENV_NAME] \
--token "apigee-oauth-token" \
--api [API_NAME] \
--directory ./
```

### Undeploy Proxy

[Reference.](https://www.npmjs.com/package/apigeetool#undeploy)

```bash
apigeetool undeploy \
--organization [ORG_NAME] \
--environment [ENV_NAME] \
--token "apigee-oauth-token" \
--api [API_NAME] \
--revision [API_REVISION]
```

### Create Cache

[Reference.](https://www.npmjs.com/package/apigeetool#createcache)

```bash
apigeetool createcache \
--token "apigee-oauth-token"
--organization [ORG_NAME] \
--environment [ENV_NAME] \
-z "cache-resource-name"
```

### Delete Cache

[Reference.](https://www.npmjs.com/package/apigeetool#deletecache)

```bash
apigeetool deletecache \
--token "apigee-oauth-token"
--organization [ORG_NAME] \
--environment [ENV_NAME] \
-z "cache-resource-name"
```

### KVM Operations

[Reference.](https://www.npmjs.com/package/apigeetool#kvm-operations)

#### Create KVM

```bash
apigeetool createKVMmap \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] --mapName "map-name"
```

#### Delete KVM

```bash
apigeetool deleteKVMmap \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] --mapName "map-name"
```

#### Add KVM Entry

```bash
apigeetool addEntryToKVM \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] \
--mapName [map-name] \
--entryName 'key-name' \
--entryValue 'key-value'
```

#### Delete KVM Entry

```bash
apigeetool deleteKVMentry \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] \
--mapName [map-name] \
--entryName 'key-name' 
```

### Target Server Operations

[Reference.](https://www.npmjs.com/package/apigeetool#target-server-operations)

#### Create Target Server

```bash
apigeetool createTargetServer \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] \
--targetServerName [target-server-name] \
--targetHost [target-host] \
--targetPort [target-port] \
--targetSSL [target-ssl] \
--targetEnabled [target-enabled]
```

#### Delete Target Server

```bash
apigeetool deleteTargetServer \
--token "apigee-oauth-token" \
--organization [ORG_NAME] \
--environment [ENV_NAME] \
--targetServerName [target-server-name]
```

## Maven Build

We can use the [apigee-deploy-maven-plugin](https://github.com/apigee/apigee-deploy-maven-plugin) to deploy proxies.

```bash
mvn install \
-P [ENV_NAME] \
-Dorg=[ORG_NAME] \
-Dusername=[USERNAME] \
-Dpassword=[PASSWORD] \
-Doptions=update
```

## Openapi2Apigee Build

We can use [openapi2apigee](https://www.npmjs.com/package/openapi2apigee) to deploy a proxy from an openapi specification yaml.

```bash
openapi2apigee generateApi [API_NAME]  \
-s [SPEC_FILEPATH]   \
-d . -n -b  https://api.enterprise.apigee.com \
-o [ORG_NAME] \
-e [ENV_NAME] \
-v [VIRTUAL_HOST] \
-u [USERNAME] \
-p [PASSWORD] -D
```

## Static Code Analysis

We would be using [apigeelint](https://github.com/apigee/apigeelint) for performing static code analysis.

```bash
apigeelint -s apiproxy/
```

## Unit Testing

We would be using [mocha](https://mochajs.org/) and [sinon](https://sinonjs.org/) for performing unit tests.

```bash
./node_modules/mocha/bin/mocha unit/test.js
```

## Integration Testing

We would be using [apickli](https://www.npmjs.com/package/apickli) for performing some basic integration testing. Check the documentation for basic setup.

__Run Integration Testing:__

```bash
./node_modules/@cucumber/cucumber/bin/cucumber-js features/apiproxy.feature
```


