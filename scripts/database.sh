# You need to install Prisma CLI first
npm install -g prisma

# Migrate database
cd ../database
prisma deploy # keeps the data and updates the migrations
# prisma deploy --force to delete all values
# prisma deploy -e env.prod for a specific environment

# Reset the data
prisma reset

# Run the seeder
prisma seed