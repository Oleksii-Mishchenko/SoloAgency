# Use the official Node.js image as a base image
FROM node:21

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code
COPY frontend/ .

# Expose the port on which the React app will run
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]