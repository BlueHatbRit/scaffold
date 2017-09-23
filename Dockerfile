FROM node:latest

# Copy all files required to run Scaffold
COPY server/* Gruntfile.js index.js LICENSE MigratorConfig.js package.json README.md ./

# Install deps
RUN cd /var/www && npm install

# Startup
CMD cd /var/www && npm run db-init && npm run db-up && npm start
