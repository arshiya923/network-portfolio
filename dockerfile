# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm config set registry https://mirror2.chabokan.net/npm/

RUN npm -loglevel verbose install

COPY . .

RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
