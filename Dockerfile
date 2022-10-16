# syntax=docker/dockerfile:1

# Supports ARM + x86-64
# 'as base' allows us to refer to this build stage in other build stages
FROM node:14-buster as base
SHELL ["/bin/bash", "-c"]

# Set the root working dir inside the container
# Use relative paths based on the working dir
WORKDIR "/nblocks-react"


# Makes use of docker caching for faster re-builds.
# Using --link is equivalent or better than the default behaviour
# it creates a much better conditions for cache reuse.
RUN mkdir example
COPY --link "package.json" "./"
COPY --link [ "example/package.json", "./example/"]
COPY --link ["tsconfig.json", "./"]
COPY --link "example/tsconfig.json" "./example/"

# Refering to base, and adding new build stage labeled 'dev'
FROM base as dev
# Copy rest of the projects source code to container env
COPY . .
