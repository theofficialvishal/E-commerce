# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/Frontend

# Copy package.json and install dependencies
COPY Frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY Frontend/ .

# We define ARG and ENV so the build process has access to Vite environment variables
ARG VITE_STRIPE_PUBLISHABLE_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

# Build the frontend
RUN npm run build

# Stage 2: Build the backend and final image
FROM node:20-alpine
WORKDIR /app

# Copy backend package.json and install production dependencies
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install --production

# Copy backend source code
COPY Backend/ ./Backend/

# Copy built frontend from the previous stage
COPY --from=frontend-builder /app/Frontend/dist ./Frontend/dist

# Set working directory to the Backend where server.js is located
WORKDIR /app/Backend

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
