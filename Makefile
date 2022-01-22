setup:
	cd frontend && npm install

run: run-frontend run-api

run-api:
	export FLASK_APP=backend.py
	flask run

run-frontend:
	cd frontend && npm run start