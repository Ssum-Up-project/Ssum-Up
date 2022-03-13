FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime

WORKDIR /app

COPY ./requirements.txt .


RUN apt-get update \
  && pip3 install --upgrade pip setuptools \
  && pip3 install -r requirements.txt

COPY . .