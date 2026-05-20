FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json files for both backend and frontend
COPY Backend/package*.json ./Backend/
COPY Frontend/package*.json ./Frontend/

# Install dependencies for both backend and frontend
# (Doing this before copying the rest of the code leverages Docker caching)
RUN cd Backend && npm install
RUN cd Frontend && npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
# We define ARG and ENV so the build process has access to Vite environment variables
ARG VITE_STRIPE_PUBLISHABLE_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

RUN cd Frontend && npm run build

# Set working directory to the Backend where server.js is located
WORKDIR /app/Backend

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port your backend runs on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
