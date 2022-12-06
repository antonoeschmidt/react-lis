FROM node:18.8.0-alpine AS builder
ENV NODE_ENV production

# Build React App
WORKDIR /app
COPY ./client/package.json .
RUN npm install --production
COPY ./client .
RUN npm run build

# Serve
FROM nginx:1.15.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY ./client/conf /etc/nginx

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./client/env.sh .
COPY ./client/.env .

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]