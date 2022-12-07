# start by pulling the python image
FROM python:3.8

COPY ./requirements.txt /app/requirements.txt

# switch working directory
WORKDIR /app

RUN pip install -r requirements.txt

COPY services/ /app

ENTRYPOINT [ "python" ]

CMD [ "queueing.py" ]
