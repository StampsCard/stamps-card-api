#!/usr/bin/env bash

# Delete the current machine if exists
docker-machine rm prisma
# Unset the environment variables
unset ${!DOCKER*}
# Create a new docker-machine instance
docker-machine create --driver amazonec2 --amazonec2-region eu-central-1 prisma
# Define your environment variables
docker-machine env prisma # Shows the commands
eval $(docker-machine env prisma) # Execute the commands into your machine
export COMPOSE_TLS_VERSION=TLSv1_2

# Copy the docker-compose example with 1 instance with the prisma image and another one with mysql
# Create the containers in the AWS instances
docker-compose up -d
# Display the IP from the machine
docker-machine ip prisma
# To connect using SSH
docker-machine ssh prisma
# Assign the security groups: RDS, prisma and docker-machine to the AWS instance using the dashboard

# To switch from docker-machine to local
unset ${!DOCKER*}
# To local to docker-machine
eval $(docker-machine env prisma)
export COMPOSE_TLS_VERSION=TLSv1_2
