FROM nginx:1.13-alpine
COPY ./nginx /etc/nginx
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY ./build /www
EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
