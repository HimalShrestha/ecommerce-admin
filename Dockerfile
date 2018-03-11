FROM node:8.4.0

# Create app directory
RUN mkdir -p /usr/src/ecommAdmin
WORKDIR /usr/src/ecommAdmin

# Install app dependencies
COPY package.json /usr/src/ecommAdmin/
RUN npm install

# Bundle app source
COPY . /usr/src/ecommAdmin

RUN npm run build

EXPOSE 7007
CMD [ "npm", "run", "run-server" ]
