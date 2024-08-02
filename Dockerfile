# Start your image with a node base image
FROM node:20-alpine AS build



# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
# RUN npm install && npm cache clean --force 
RUN npm ci

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm ci --only=production

EXPOSE 4000

# Start the app using serve command
CMD [ "npm", "run", "start:prod" ]