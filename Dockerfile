FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY .babelrc /usr/src/app/

RUN npm install

# copy reminder of the files
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm" , "start" ]
