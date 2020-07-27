pipeline {
  environment {
    // environment variables and credential retrieval can be interspersed
    DOCKER_LOGIN = credentials("docker_login")
    DOCKER_PASSWORD = credentials("docker_password")
  }

  agent any
  stages {
    stage("build") {
      steps {
        // sh 'docker rm $(docker ps -aq)'
        sh 'docker login -u $DOCKER_LOGIN -p $DOCKER_PASSWORD'
        sh 'docker build --tag alissongaliza/lastseen:local --file ./Dockerfile.local .'
        sh 'docker push alissongaliza/lastseen:local'
      }
    }
  }
}