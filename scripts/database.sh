# You need to install Prisma CLI first
npm install -g prisma

# Migrate database
cd ../database
prisma deploy # keeps the data and updates the migrations
# prisma deploy --force to delete all values
# prisma deploy -e env.prod for a specific environment

# Reset the data
prisma reset

# Generate prisma token
prisma token

# Run the seeder
prisma seed

# Call prisma endpoint
curl '__YOUR_PRISMA_ENDPOINT__' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer __YOUR_SERVICE_TOKEN__' \
--data-binary '{"query":"mutation { createUser(data: { name: "Sarah" }) { id } }"'

# To access to Prisma endpoint
http://localhost:4466/stamps-card-api/dev/_admin
# And go to settings > secret token is the JWT token generated with 'prisma deploy'