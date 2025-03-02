# Étape de construction
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/.output ./
COPY --from=build /app/package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "./server/index.mjs"]