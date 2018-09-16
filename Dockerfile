FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY .babelrc .

RUN npm install

# copy reminder of the files
COPY . .

EXPOSE 3000

CMD [ "npm" , "start" ]
