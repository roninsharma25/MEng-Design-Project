export FLASK_APP=backend.py
export PYTHONDONTWRITEBYTECODE=1

setup:
	cd frontend-template && npm install
	pip install -r requirements.txt

run: run-frontend run-api run-database run-memcached

run-api:
	flask run

run-frontend:
	cd frontend-template && npm run start

run-database:
	mongod --dbpath ./database --port 4000

run-jaeger-tracing-container:
	docker run -d -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp   -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 jaegertracing/all-in-one:latest

run-memcached:
	memcached
