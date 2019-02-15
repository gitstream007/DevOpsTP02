FROM ubuntu
RUN apt update && apt install curl gnupg -yq
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt update && apt-get install -yq nodejs mongodb
RUN npm init -y && npm install --save mongodb express
RUN mkdir /data
COPY app.js /app.js
COPY start.sh /start.sh
RUN chmod +x /start.sh && chown 700 /start.sh
WORKDIR /data
VOLUME ["/data"]
EXPOSE 80
ENTRYPOINT ["/start.sh"]