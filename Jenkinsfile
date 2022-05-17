pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Clone Repository') {
      steps {
        checkout scm: [
          $class: 'GitSCM',
          userRemoteConfigs: [
            [
              credentialsId: 'ee722ac1-794b-4c24-8c6a-b8bff4d98fc2'
              url: 'https://github.com/nazordz/node-redis'
            ]
          ],
          branches: [[name: 'refs/tags/${TAG}']]
        ]
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }  
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
  }
}