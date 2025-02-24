### DOCKER COMPOSE COMMANDS

.PHONY: compose-build
compose-build:
	docker compose build

.PHONY: compose-up
compose-up:
	docker compose up

.PHONY: compose-up-build
compose-up-build:
	docker compose up --build

.PHONY: compose-down
compose-down:
	docker compose down

### DOCKER CLI COMMANDS

#where do I find the files I need to build the image?
DOCKERCONTEXT_DIR:=react-client
#where do I find the Dockerfile to build the image from?
DOCKERFILE_DIR:=react-client

.PHONY: docker-build-all
docker-build-all:
	docker build -t react-client-vite -f ${DOCKERFILE_DIR}/Dockerfile.1 ${DOCKERCONTEXT_DIR}

	docker build -t react-client-ngnix -f ${DOCKERFILE_DIR}/Dockerfile.2 ${DOCKERCONTEXT_DIR}

	docker build -t node-api -f api-node/Dockerfile api-node/

DATABASE_URL:=postgres://postgres:koicarp32@postgres-db:5432/postgres

.PHONY: docker-run-all
docker-run-all:
# Stop and remove all running containers to avoid name conflicts
	$(MAKE) docker-stop

	$(MAKE) docker-rm

	docker network create my-network

	docker run -d \
		--name postgres-db \
		--network my-network \
		-e POSTGRES_PASSWORD=koicarp32 \
		-v pgdata:/var/lib/postgresql/data \
		-p 5432:5432 \
		--restart unless-stopped \
		postgres:15.1-alpine3.16

	docker run -d \
		--name node-api \
		--network my-network \
		-e DATABASE_URL=${DATABASE_URL} \
		-p 3000:3000 \
		--restart unless-stopped \
		node-api

#	docker run -d \
		--name react-client-vite \
		--network my-network \
		-v ${PWD}/react-client/vite.config.js:/usr/src/app/vite.config.js \
		-p 5173:5173 \
		--restart unless-stopped \
		react-client-vite

	docker run -d \
    --name react-client-vite \
    --network my-network \
    -v ${PWD}/react-client:/usr/src/app \
    -v /usr/src/app/node_modules \
    -p 5173:5173 \
    --restart unless-stopped \
    react-client-vite
#-v ${PWD}/react-client:/usr/src/app mounts the whole thing into the container's work dir
#-v /usr/src/app/node_modules makes sure the node_modules folder stays empty to avoid conflicts
#this enables hot reloading from vite	

	docker run -d \
		--name react-client-ngnix \
		--network my-network \
		-p 80:8080 \
		--restart unless-stopped \
		react-client-ngnix

.PHONY: docker-stop
docker-stop:
	-docker stop postgres-db
	-docker stop node-api
	-docker stop react-client-vite
	-docker stop react-client-ngnix

.PHONY: docker-rm
docker-rm:
	-docker container rm postgres-db
	-docker container rm node-api
	-docker container rm react-client-vite
	-docker container rm react-client-ngnix
	-docker network rm my-network