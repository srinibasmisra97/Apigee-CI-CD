pipeline {
    agent any;

    parameters {
        choice(
           name: 'ENVIRONMENT',
           choices: "test\nprod",
           description: 'The environment to deploy to.')
    }

    tools {
        nodejs 'node'
    }

    stages {

        stage('Access Token'){
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'apigee-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]){
                    sh "curl --location --request POST \'https://login.apigee.com/oauth/token\' --header \'Content-Type:  application/x-www-form-urlencoded;charset=utf-8\' --header \'accept:  application/json;charset=utf-8\' --header \'Authorization:  Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0\' --data-urlencode \'grant_type=password\' --data-urlencode \'username=${USERNAME}\' --data-urlencode \'password=${PASSWORD}\' -s | cut -d\'\"\' -f4 > token.txt"
                }
            }
        }

        stage('Create Cache'){
            steps{
                sh "apigeetool createcache --token `cat token.txt` -o orgname -e ${params.ENVIRONMENT} -z test-cicd-cache"
            }
        }

        stage('Create KVM'){
            steps{
                sh "apigeetool createKVMmap --token `cat token.txt` -o orgname -e ${params.ENVIRONMENT} --mapName test-cicd-kvm"
            }
        }

        stage('Add KVM Entry'){
            steps{
                sh "apigeetool addEntryToKVM --token `cat token.txt` -o orgname -e ${params.ENVIRONMENT} --mapName test-cicd-kvm --entryName 'cicd-key' --entryValue 'cicd-value'"
            }
        }

        stage('Create Target Server'){
            steps{
                sh "apigeetool createTargetServer --token `cat token.txt` -o orgname -e ${params.ENVIRONMENT} --targetServerName test-cicd-target-server --targetHost httpbin.org --targetPort 443 --targetSSL true --targetEnabled true"
            }
        }

    }
}