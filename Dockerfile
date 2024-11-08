# Use official Node.js image as the base
FROM node:18-alpine


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Set environment variables if needed
# ENV NEXT_PUBLIC_API_URL=https://example.com

# Build the Next.js app
RUN npm run build --verbose

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
