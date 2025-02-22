DATABASE_URL:=postgres://postgres:koicarp32@localhost:5432/postgres

.PHONY: run-postgres
#sudo docker network create my-network
run-postgres:
	@echo Starting postgres container
	-docker run \
		--name postgres-db \
		--network my-network \
		-e POSTGRES_PASSWORD=koicarp32 \
		-v pgdata:/var/lib/postgresql/data \
		-p 5432:5432 \
		postgres:15.1-alpine

.PHONY: run-api-node
run-api-node:
	@echo Starting node api
	cd api-node && \
		DATABASE_URL=${DATABASE_URL} \
		node src/index.js