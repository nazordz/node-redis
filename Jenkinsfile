// node {
//     def app
//     stage('Clone repository') {
//         /* Let's make sure we have the repository cloned to our workspace */

//         checkout scm
//     }
// }

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