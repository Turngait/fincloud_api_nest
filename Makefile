start_prod:
	echo 'Prodaction mode starting'
	docker-compose -f docker-compose.vps.yaml up -d

down_prod:
	echo 'Prodaction mode down'
	docker-compose -f docker-compose.vps.yaml down

start_test:
	echo 'Test mode starting'
	docker-compose -f docker-compose.test.yaml up -d

down_test:
	echo 'Test mode down'
	docker-compose -f docker-compose.test.yaml down

start_dev:
	echo 'Development mode up'
	docker-compose -f docker-compose.dev.yaml up -d

down_dev:
	echo 'Development mode starting'
	docker-compose -f docker-compose.dev.yaml down

start_db:
	echo 'DB up'
	docker-compose -f docker-compose.db.yaml up -d

down_db:
	echo 'DB up'
	docker-compose -f docker-compose.db.yaml down