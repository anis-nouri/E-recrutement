#!/bin/bash

CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="create-db"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# MySQL/MariaDB container details
CONTAINER_NAME="mysql"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="recrutement"

# Path to the SQL dump file
SQL_DUMP_FILE="./job_db.sql"

# Import the SQL dump file using docker exec
docker exec -i "$CONTAINER_NAME" mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$SQL_DUMP_FILE"
docker exec -i "$CONTAINER_NAME" mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES;"
