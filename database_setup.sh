#!/bin/bash

# Checking if docker exists and is installed 
# if command -v docker &>/dev/null
# then 
#     echo "Docker can't be found."
#     exit 1
# fi


# postgres DB set up with diesel
echo "Pulling postgres docker image..."
export DOCKER_CONTENT_TRUST=1; 
# if $(docker pull postgres:latest) 
# then
#     echo "Postgres image pulled."
# else
#     echo "Cannot pull postgres image. Exiting."
#     exit 1
# fi
docker pull postgres:latest

openssl rand -hex 20 > db_secrets.txt

docker run -e POSTGRES_USER=blogdev -e POSTGRES_DB=blogdb -e POSTGRES_PASSWORD=blogdev -p 5432:5432 postgres:latest


export DATABASE_URL="postgresql://blogdev:blogdev@postgres:5432/blogdb" cargo run 
