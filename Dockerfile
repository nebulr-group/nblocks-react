# syntax=docker/dockerfile:1

FROM node:20

WORKDIR "/app"

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

# Run build with installed dep
RUN npm run build