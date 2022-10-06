#!/bin/bash

function updateLambda () {
  local kREGEXP="^.*digest:.*(sha256:[[:alnum:]]*).*$"
  local line=$(./upload.sh | tail -n 1)

  if [[ $line =~ $kREGEXP ]] ; then
    local DIGEST=${BASH_REMATCH[1]}
  fi

  local FUNCTION_NAME="lambda-sphere-service"
  local REPO="414097980318.dkr.ecr.eu-north-1.amazonaws.com/lambda-sphere-service"
  local URI="${REPO}@${DIGEST}"

  echo $line
  echo $URI
  aws lambda update-function-code --function-name ${FUNCTION_NAME} --image-uri ${URI}
}

updateLambda $1