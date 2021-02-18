# Builder to compile application
FROM node:12 AS builder
WORKDIR /usr/app
RUN npm set registry https://code-repo.wwtatc.com/repository/atc-npm
COPY package*.json gulpfile.js tsconfig.json ./
COPY types types/
RUN npm ci
COPY src src/
RUN npm run compile

# Final production container
FROM node:12
ENV NODE_ENV=production
WORKDIR /usr/app
RUN npm set registry https://code-repo.wwtatc.com/repository/atc-npm
COPY package*.json ./
RUN npm ci
COPY --from=builder /usr/app/release/ release/
EXPOSE 3000
CMD ["npm", "run", "start"]