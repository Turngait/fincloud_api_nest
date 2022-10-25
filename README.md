# FinCloud API

This is API for FinCloud project.

This project has two API:
- APP API. it is main API which works with all entities.
- AUTH API. It is authentication API. It is works only with user's entities. In future it will be as a third-party API.

## Local project setup

0. To develop this project you need to install several programs:
```
nodejs
git
docker
docker-compose
```

1. Clone this project.
```
git clone https://github.com/Turngait/fincloud_api_nest.git
```

2. Go to develop branch
```
git checkout develop
```

3. You need to make "npm install" in folder of all services. 
```
cd app
npm install

cd ../auth
npm install
cd ..
```

4. Then firstly launch only DB
```
docker-compose -f docker-compose.db.yaml up
```

5. Go to PhpMyAdmin and create two DB - 'fincloud' and 'users'

6. After stop all containers.
```
docker-compose -f docker-compose.db.yaml down
```

7. And start containers in dev mode
```
docker-compose up
```

......

### This project developed by
```
http://ilya-r.com/
```
--------------------------------------------
# This documentation is not finished yet.
--------------------------------------------

# Releases
## Beta

### APP 0.0.8
- Beta release
