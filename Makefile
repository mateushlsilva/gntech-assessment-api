COMPOSE=docker-compose


up:
	@echo "Iniciando containers..."
	$(COMPOSE) up -d

down:
	@echo "Parando containers..."
	$(COMPOSE) down


setup: up 
	@echo "Setup concluído!"
