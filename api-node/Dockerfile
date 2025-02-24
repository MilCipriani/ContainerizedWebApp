#run this file with sudo docker build . when in the same directory
#each command adds a layer to the final docker container-> minimize the steps


FROM node:23.8.0-alpine

#set working directory inside the container
WORKDIR usr/src/app

#if set to prod the app will behave one way, if unset it will run in dev mode
ENV NODE_ENV=production

#copy package.json and package-lock.json now to avoid cache issues
COPY package*.json ./

#install dependencies from package-lock.json
#RUN npm install
#better to do ci clean install for production (won't download dev dependencies)
RUN npm ci --only=production

#specific to this node-alpine image. Handles permissions better
USER node

#copy the rest of the application files (I only need src)
COPY --chown=node:node ./src .

#expose API's port
EXPOSE 3000

#start API
CMD ["node", "index.js"]
