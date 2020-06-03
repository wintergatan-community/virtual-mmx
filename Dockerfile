FROM amd64/node:14.4.0-alpine3.11 as build
RUN apk add --update git
WORKDIR /work
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /work/build /usr/share/caddy