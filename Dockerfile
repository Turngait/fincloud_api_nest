FROM python:3.9

RUN apt-get update
RUN apt-get install python3-mysqldb -y
RUN pip3 install mysqlclient
RUN pip install Flask flask-sqlalchemy redis Werkzeug
RUN pip install -U flask-cors
RUN pip3 install PyMySQL
RUN pip install sqlalchemy
RUN pip install requests
RUN pip install python-dotenv
WORKDIR /api
COPY api /api

CMD ["python", "main.py"]