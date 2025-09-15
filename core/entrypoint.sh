#!/bin/bash 

db_passwd=$(cat $POSTGRES_PASSWORD_FILE)
DATABASE_URL="postgresql://${POSTGRES_USER}:${db_passwd}@postgres:5432/${POSTGRES_DB}"
echo $DATABASE_URL
export DATABASE_URL=$DATABASE_URL
diesel migration run
# echo $DATABASE_URL > /core/.env
# diesel setup
# diesel migration generate create_articles
# diesel migration redo
/bin/server 