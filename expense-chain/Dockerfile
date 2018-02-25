FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN cd /app && $(npm bin)/ng build

EXPOSE 4200
CMD ["npm", "start"]
