#! /bin/sh

docker rm $(docker kill $(docker ps -a -q --filter ancestor=progen-test --format="{{.ID}}"))