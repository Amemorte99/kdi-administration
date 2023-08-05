# stage 1

FROM node:16.14.2-alpine as builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration="production"
# EXPOSE 4200
# CMD ["npm", "start"]

# Stage 2
FROM nginx:1.21.6-alpine
EXPOSE 80

RUN rm -rf /usr/share/nginx/html/*

COPY src/app/conf/default.conf /etc/nginx/conf.d/

COPY --from=builder /app/dist/immob_admin /usr/share/nginx/html
