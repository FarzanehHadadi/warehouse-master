FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* yarn.lock* ./

# Ignore strict peer dependency resolution to avoid ERESOLVE in Docker
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

EXPOSE 2323

CMD ["npm", "run", "dev"]
