FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .

RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 5173

ENV NODE_ENV=production
ENV PORT=5173
ENV ORIGIN=http://localhost:5173

CMD [ "npm", "run", "production" ]