#!/bin/bash

function updateLambda () {
  local kREGEXP="^(.*)\/(.*)@(.*):.*digest:.*(sha256:[[:alnum:]]*).*$"
  # local line=$(./upload.sh | tail -n 2)

  if [ "$1" ]
    then local digest=$1
    else local line="latest: digest: sha256:3ec1b8dff717d0f2d0b426c1b2c5d4a026cedb4919500161de080805a4341f6f size: 3253"
  fi

  if [[ $line =~ $kREGEXP ]] ; then
    local repo=${BASH_REMATCH[1]}
    local image=${BASH_REMATCH[2]}
    local tag=${BASH_REMATCH[3]}
    local digest=${BASH_REMATCH[4]}
  fi

  local uri="${repo}/${image}:${tag}@${digest}"
  echo $line
  echo $uri
  aws lambda update-function-code --function-name ${image} --image-uri ${uri}
}

updateLambda $1