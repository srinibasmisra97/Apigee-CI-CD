pipeline {
    agent any;

    tools {
        nodejs 'node'
    }

    stages {

        stage ('Deploy Proxy'){
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'apigee-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]){
                    sh '''
                        npm install -g openapi2apigee
                        cd proxies/trading-apis
                        openapi2apigee generateApi Mobile-Trading-API-Automated  -s openapi.yaml   -d . -n -b  https://api.enterprise.apigee.com -o orgname -e test -v secure -u ${USERNAME} -p ${PASSWORD} -D
                    '''
                }
            }
        }

    }
}