#!/usr/bin/env bash

# Use docker machine to run the instance in AWS - This instance contains the Prisma Server
# https://docs.docker.com/machine/examples/aws/#step-1-sign-up-for-aws-and-configure-credentials
docker-machine create --driver amazonec2 --amazonec2-open-port 8000 --amazonec2-region us-west-1 aws-sandbox #  to create the instance
docker-machine ip prisma # to see the IP of the AWS instance
docker-machine ssh prisma # to connect using SSH

# Prisma CLI
prisma deploy # deploy the changes to the server configured in prisma.yml
prisma init # create a new docker-compose file
prisma delete # delete the current service.

# Deploy it with now
now --dotenv .env.prod


