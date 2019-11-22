# Container logs
docker logs database_prisma_1 --tail 50

# Gets the IP address from the docker container
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' database_prisma_1

# Networks
docker network ls

# Check the running containers
docker ps
# Check all the containers
docker ps -a

# Hard reset in docker compose
docker-compose kill

# Connecting with SSH into a container
docker exec -ti database_prisma_1 /bin/bash

# Connect to a container and check which network is using running
ifconfig
# Install net-tools if the pacage is not installed in the image
apt-get update
apt-get install net-tools
