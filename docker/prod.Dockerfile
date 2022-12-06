FROM node:18.8.0-alpine AS builder
ENV NODE_ENV production

### React App
WORKDIR /app
COPY ./client/package.json .
RUN npm install --production
COPY ./client .
RUN npm run build

### Nginx Server
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]