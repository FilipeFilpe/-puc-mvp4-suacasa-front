# FROM node:18-alpine

# WORKDIR /front

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# RUN npm install

# COPY . .

# CMD [ "npm", "run" , "dev"]

# EXPOSE 3000

FROM node:18-alpine

WORKDIR /front

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]