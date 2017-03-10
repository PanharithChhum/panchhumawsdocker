FROM node:boron

#create app dicrectory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN apt-get -y update
RUN apt-get -y install apt-utils
RUN apt-get -y install python-pip
RUN apt-get -y install python-dev
RUN pip install --user --upgrade awscli
RUN export PATH=~/.local/bin:$PATH

EXPOSE 8080
CMD [ "npm", "start" ]