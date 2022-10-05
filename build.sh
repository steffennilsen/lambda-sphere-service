#!/bin/bash
docker buildx build . -t lambda-sphere-service:latest --target lambda-sphere-service