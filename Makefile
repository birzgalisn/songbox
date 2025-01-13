DOCKER_COMPOSE := docker compose --env-file .env -f docker-compose.yaml

.PHONY: dev
dev:
	$(DOCKER_COMPOSE) up

.PHONY: prod
prod:
	$(DOCKER_COMPOSE) up --build --force-recreate

.PHONY: remove
remove:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans --rmi all
