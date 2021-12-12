FROM node:14.18-alpine3.14

RUN apk update
RUN apk add --no-cache bash curl mysql-client && \
    curl https://raw.githubusercontent.com/eficode/wait-for/v2.1.3/wait-for --output /usr/bin/wait-for && \
    chmod +x /usr/bin/wait-for

RUN npm install -g @nestjs/cli@8.0.0

USER node
RUN touch /home/node/.bashrc | echo "PS1='\w \$ '" >> /home/node/.bashrc

WORKDIR /home/node/app
