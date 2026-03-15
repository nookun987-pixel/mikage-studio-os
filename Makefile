PNPM := pnpm

.PHONY: install typecheck lint format up down

install:
	$(PNPM) install

typecheck:
	$(PNPM) typecheck

lint:
	$(PNPM) lint

format:
	$(PNPM) format

up:
	docker compose -f infra/compose/docker-compose.local.yml up -d

down:
	docker compose -f infra/compose/docker-compose.local.yml down
