#!/usr/bin/env bash
# Create the environment in AWS (only first time)
# eb init --platform node.js --region eu-central-1
# Create a sample app in AWS (only first time)
# eb create --sample stamps-card-api

# Requisites
# You need to install make, gcc-c++ & python
# sudo yum install -y make \ gcc-c++ \ python

# Deploy the app
eb deploy
# Start the app on the browser
eb open

# You need to deploy the database
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html