pipeline {
    agent any;

    tools {
        nodejs 'node'
    }

    stages {

        stage('Static Code Analysis') {
            steps {
                sh '''
                    npm install -g apigeelint apigeetool
                    apigeelint -s proxies/trading-apis/apiproxy/
                '''
            }
        }

        stage('Unit Tests'){
            steps {
                sh '''
                    cd tests/
                    npm install
                    ./node_modules/mocha/bin/mocha trading-apis/unit/test.js
                '''
            }
        }

        stage('Deploy Proxy'){
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'apigee-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]){
                    sh "curl --location --request POST \'https://login.apigee.com/oauth/token\' --header \'Content-Type:  application/x-www-form-urlencoded;charset=utf-8\' --header \'accept:  application/json;charset=utf-8\' --header \'Authorization:  Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0\' --data-urlencode \'grant_type=password\' --data-urlencode \'username=${USERNAME}\' --data-urlencode \'password=${PASSWORD}\' -s | cut -d\'\"\' -f4 > proxies/trading-apis/token.txt"
                    sh '''
                        cd proxies/trading-apis/
                        apigeetool deployproxy --token `cat token.txt` -o orgname -e prod --api Jenkins-Trading-APIs -d ./
                    '''
                }
            }
        }

        stage('Integration Tests'){
            steps {
                sh '''
                    cd tests/
                    npm install
                    ./node_modules/@cucumber/cucumber/bin/cucumber-js trading-apis/prod/features/apiproxy.feature
                '''
            }
        }
    }
}