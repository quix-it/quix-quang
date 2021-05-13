FROM nginxinc/nginx-unprivileged:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY documentation /usr/share/nginx/html/doc

EXPOSE 8080
