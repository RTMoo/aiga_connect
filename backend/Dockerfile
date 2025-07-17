FROM python:3.11-slim

ENV PYTHONPATH=/backend
WORKDIR /backend

ENV VIRTUAL_ENV=/opt/venv
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt /backend/requirements.txt
RUN pip install -r requirements.txt

