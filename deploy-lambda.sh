#!/bin/bash
./upload.sh
aws lambda update-function-code --function-name lambda-sphere-service --image-uri $(aws lambda get-function --function-name lambda-sphere-service | jq -r '.Code.ImageUri')