FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code to container
COPY . .

# Build React app
RUN npm run build

# Expose port React app is running on to host
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
