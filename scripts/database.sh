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

# Generate prisma client and schema
prisma generate

# Generates a file that represents the data model of the selected database in graphql
prisma introspect

# Call prisma endpoint
curl '__YOUR_PRISMA_ENDPOINT__' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer __YOUR_SERVICE_TOKEN__' \
--data-binary '{"query":"mutation { createUser(data: { name: "Sarah" }) { id } }"'

# To access to Prisma endpoint
http://localhost:4466/stamps-card-api/dev/_admin
# You need to generate a token and set it to settings.
# 1. Access to the URL mentioned above and go to settings (top right).
# 2. We need to set the secret token.
# 3. Is the JWT token generated runnin 'prisma token'