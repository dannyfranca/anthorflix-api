#!/bin/sh

SHA=$(git rev-parse HEAD)

docker build . -f Containerfile -t dannyfranca/anthorflix-api:latest -t dannyfranca/anthorflix-api:$SHA --target runtime

docker push dannyfranca/anthorflix-api:latest
docker push dannyfranca/anthorflix-api:$SHA
