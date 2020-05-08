install:
	python3 -m venv venv
	venv/bin/pip install Flask
	source ./venv/bin/activate

serve:
	FLASK_APP=server.py FLASK_ENV=development flask run