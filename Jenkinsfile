pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
    stage('Clone Repository') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Test') {
      steps {
         sh 'yarn test'
      }
    }  
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
  }
}