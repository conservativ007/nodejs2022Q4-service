FROM node:lts-alpine 
# FROM node:18-alpine AS builder 
WORKDIR /usr/app/
COPY package*.json .
COPY tsconfig*.json .
RUN npm install
RUN npm cache clean --force
# WORKDIR /usr/app/foo
COPY . .

# FROM node:18-alpine
# COPY --from=builder /usr/app/foo ./app

# WORKDIR /app