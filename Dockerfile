FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install

# Build app (compile typescript)
RUN npm run build

# Build app and run task script
CMD ["/usr/src/app/run"]
