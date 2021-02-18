#! /bin/sh

docker build . -t progen-test
docker run -it \
--mount type=bind,source="$(pwd)"/configs,target=/usr/app/configs \
--env ATC_API_SUFFIX=.apps-local.wwtatc.local \
-p 127.0.0.1:3000:3000 progen-test