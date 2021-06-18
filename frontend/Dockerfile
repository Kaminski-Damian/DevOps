# NODE
FROM node:alpine as my-build 

WORKDIR /opt/my-app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

# NGINX
FROM nginx

COPY --from=my-build /opt/my-app/build /usr/share/nginx/html