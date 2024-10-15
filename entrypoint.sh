#!/bin/bash 

$DB_PASSWD=$(cat /run/secrets/db-password)

export DATABASE_URL="postgresql://$POSTGRES_USER:$DB_PASSWD@postgres:5432/$POSTGRES_DB" cargo run 


diesel migration run

/bin/server