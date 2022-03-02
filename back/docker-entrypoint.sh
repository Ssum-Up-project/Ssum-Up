#!/bin/bash

python3 manage.py migrate --run-syncdb --noinput

# python3 manage.py createcachetable

if [ "$DJANGO_SUPERUSER_EMAIL" ]
then
    python3 manage.py createsuperuser \
        --noinput \
        --email $DJANGO_SUPERUSER_EMAIL
fi

$@

python3 manage.py runserver 0.0.0.0:8000
# gunicorn config 파일을 통한 실행
# gunicorn -c config/gunicorn.conf.py
