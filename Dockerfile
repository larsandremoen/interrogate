FROM python:3.7
LABEL maintainer="post@larsandre.no"

# Install requirements
COPY Pipfile /
COPY Pipfile.lock /
RUN pip install pipenv
RUN pipenv install --system --deploy

# UTF-8
ENV LANG C.UTF-8

#PYTHON BUFFER
ENV PYTHONUNBUFFERED 1

# rename to evry_middleware
COPY ./app /app

CMD uvicorn app.main:app --host 0.0.0.0 --port  $PORT $RELOAD
