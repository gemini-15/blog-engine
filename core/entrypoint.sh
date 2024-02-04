#!/bin/bash 

db_passwd=$(cat /run/secrets/db-password)
DATABASE_URL="postgresql://${POSTGRES_USER}:${db_passwd}@172.27.3.230:5432/${POSTGRES_DB}"
export DATABASE_URL=$DATABASE_URL
# echo $DATABASE_URL > /core/.env
# diesel setup
# diesel migration generate create_articles
# diesel migration redo
/bin/server 