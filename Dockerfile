FROM mhart/alpine-node:12

# Release version
ENV TASK_MANAGER_VERSION=1.1.0
ENV NODE_ENV=development

# Updates and install dependencies
RUN apk add --update --no-cache postgresql-client git

# Sets working directory and copy source
WORKDIR /var/www

COPY package*.json ./

# Updates npm to latest version, Install node dependencies and clears cache
RUN npm install npm@latest -g && \
    npm install && \
    npm cache clean --force && \
    rm -rf ~/.npm

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
