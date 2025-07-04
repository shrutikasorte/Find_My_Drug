FROM node:lts-alpine3.21 AS builder
COPY . . 
RUN npm install 
RUN npm run build

FROM nginx:latest
COPY --from=builder /dist  /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g" ,"daemon off;"]