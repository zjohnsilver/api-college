CONTAINER_NAME=api-college

local/docker/start/api:
	docker-compose up $(CONTAINER_NAME)

local/docker/start/db:
	docker-compose up postgresql