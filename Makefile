.PHONY: install generate schedule

install:
	docker-compose run node npm install

dev:
	docker-compose run --service-ports node npm run dev

start:
	docker-compose run --service-ports node npm run start

stress-test:
	docker-compose run node npm run stress-test
