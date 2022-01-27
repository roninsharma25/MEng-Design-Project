setup:
	cd frontend && npm install
	pip install -r requirements.txt

run: run-frontend run-api

run-api:
	export FLASK_APP=backend.py
	flask run

run-frontend:
	cd frontend && npm run start

run-jaeger-tracing-container:
	docker run -d -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp   -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 jaegertracing/all-in-one:latest