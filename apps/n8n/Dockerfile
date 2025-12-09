# Use Node.js 20 LTS
FROM node:20-alpine

# Install dependencies for N8N
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    ca-certificates

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy application files
COPY . .

# Create N8N data directory
RUN mkdir -p /app/.n8n

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

# Run N8N
CMD ["node", "start.js"]
