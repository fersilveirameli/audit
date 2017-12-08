#!/bin/sh

TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
docker login -e $DOCKER_EMAIL -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t <repo>:$TAG .
docker push <repo>:$TAG
