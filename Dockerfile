# syntax=docker/dockerfile:1

# Supports ARM + x86-64
# 'as base' allows us to refer to this build stage in other build stages
FROM node:18 AS base
SHELL ["/bin/bash", "-c"]

# Set the root working dir inside the container
# Use relative paths based on the working dir
WORKDIR "/nblocks-react"


# Makes use of docker caching for faster re-builds.
RUN mkdir example
COPY package.json ./
COPY ["example/package.json","./example/yarn.lock", "./example/"]
COPY ["tsconfig.json", "tsconfig.build.json", "./"]
COPY yarn.lock ./
COPY example/tsconfig.json ./example/

# Refering to base, and adding new build stage labeled 'dev'
FROM base AS dev
# Installing prod and dev dependencies
RUN yarn install
# Copy rest of the projects source code to container env
#npm 7+ requires this to be set so we do not need to login to verdaccio
RUN npm set //host.docker.internal:4873/:_authToken=none
COPY . .
# Run build with installed dep
RUN yarn bootstrap

# Refering to base, and adding new build stage label 'test'
FROM base AS test
# Installing prod and dev dependencies
RUN yarn install
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN yarn bootstrap

# Refering to base, and adding new build stage label 'prod'
FROM base AS prod
# Installing prod dependencies
RUN yarn install --production
# Copy rest of the projects source code to container env
COPY . .
# Run build with installed dep
RUN yarn bootstrap