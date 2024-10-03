# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies and generate package-lock.json
RUN npm install && \
    npm audit fix && \
    npm install --package-lock-only

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application (if necessary)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "src/server.js"]