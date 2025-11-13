# ---------- Stage 1: Build ----------
FROM node:20-slim AS builder
WORKDIR /app

# Copy only package files first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code into container
COPY . .

# Build Next.js app (output in .next/)
RUN npm run build

# ---------- Stage 2: Runtime ----------
FROM node:20-slim
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app ./

# Expose the internal app port
EXPOSE 3100

# Start Next.js in production mode on port 3100
CMD ["npm", "start", "--", "-p", "3100"]
