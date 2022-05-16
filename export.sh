#!/bin/bash

mysql -h 127.0.0.1 -u root -e \
    "SET GLOBAL collation_connection = 'utf8mb4_general_ci';"
mysql -h 127.0.0.1 -u root -e "SET GLOBAL sql_mode = '';"

# ./import_csv.sh data/world.csv owid

mysql -h 127.0.0.1 -u root inek <query/birth_complications.sql >./out/birth_complications.csv
mysql -h 127.0.0.1 -u root inek <query/malformations.sql >./out/malformations.csv

mysql -h 127.0.0.1 -u root inek <query/heart_code.sql >./out/heart_code.csv
