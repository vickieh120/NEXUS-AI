FROM node:lts-buster
RUN git clone https://github.com/officialPkdriller/NEXUS/root/officialPkdriller 
WORKDIR /root/officialPkdriller 
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]


