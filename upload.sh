#!/bin/bash
./build.sh
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 414097980318.dkr.ecr.eu-north-1.amazonaws.com
docker tag lambda-sphere-service:latest 414097980318.dkr.ecr.eu-north-1.amazonaws.com/lambda-sphere-service:latest
docker push 414097980318.dkr.ecr.eu-north-1.amazonaws.com/lambda-sphere-service:latest