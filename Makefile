setup:
	cd frontend && npm install
	pip install -r requirements.txt

run: run-frontend run-api

run-api:
	export FLASK_APP=backend.py
	flask run

run-frontend:
	cd frontend && npm run start