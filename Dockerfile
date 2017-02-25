FROM debian:jessie

RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install git && \
    apt-get -y install wget && \
    apt-get -y install vim && \
    curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
    apt-get install -y nodejs

RUN npm install ts-node -g
RUN npm install typescript -g
WORKDIR /app
VOLUME ["/app"]

