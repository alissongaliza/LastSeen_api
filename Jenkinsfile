pipeline {
  environment {
    DOCKER_LOGIN = credentials("docker_login")
    DOCKER_PASSWORD = credentials("docker_password")
    TMDB_API_KEY = credentials("tmdb_api_key")
  }

  agent any
  stages {
    stage("build") {
        // private dockerhub package
      steps {
        sh 'docker login -u $DOCKER_LOGIN -p $DOCKER_PASSWORD'
        // temporarily using .local file as source of truth
        sh 'docker build --tag alissongaliza/lastseen:devel --file ./Dockerfile.local .'
        sh 'docker push alissongaliza/lastseen:devel'
      }
    }
      stage("deploy") {
        agent { label 'devel' }
        // temporarily using docker commands with sudo
        steps {
            sh 'sudo docker-compose -f docker-compose.yml -f docker-compose.devel.yml down'
            sh 'sudo docker container prune -f'
            // temporarily injecting env on cli
            sh 'sudo TMDB_API_KEY=$TMDB_API_KEY docker-compose -f docker-compose.yml -f docker-compose.devel.yml up -d'
            sh 'exit'
        }
      }
    }
  }
