#!/bin/bash

echo "From bot"

appStatus=`docker ps | grep "fc-api" | grep -o "Up"`
dbStatus=`docker ps | grep "api_new_db_1" | grep -o "Up"`

if [[ $appStatus == "Up" ]]; then
	echo "App module is working"
else
	./telegram.sh "App module is down"	
fi

if [[ $dbStatus == "Up" ]]; then
	echo "DB is working"
else
	./telegram.sh "DB is down"
fi
