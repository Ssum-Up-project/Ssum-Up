#!/bin/bash

python3 manage.py migrate --run-syncdb --noinput

sudo -H -u gitlab-runner bash -c "python3 manage.py collectstatic --noinput"
# sudo chmod -R 777 static
sudo chown -R gitlab-runner:gitlab-runner static 

# python3 manage.py createcachetable

if [ "$DJANGO_SUPERUSER_EMAIL" ]
then
    python3 manage.py createsuperuser \
        --noinput \
        --email $DJANGO_SUPERUSER_EMAIL
fi

$@

# gunicorn config 파일을 통한 실행
# gunicorn -c config/gunicorn.conf.py
gunicorn config.wsgi --bind 0.0.0.0:8000 --timeout 150