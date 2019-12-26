#!/bin/bash

plugins=(`elasticsearch-plugin list`)
plugin="sql"

if [[ "${plugins[@]}" =~ $plugin ]];then
    echo "sql exit!!"
else
    elasticsearch-plugin install https://github.com/NLPchina/elasticsearch-sql/releases/download/6.2.4.0/elasticsearch-sql-6.2.4.0.zip
fi
