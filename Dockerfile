FROM nginx:stable

COPY ./dist/heineking-probeaufgabe/ /var/www/
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
