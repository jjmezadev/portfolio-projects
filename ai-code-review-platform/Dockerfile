FROM node:22-alpine
WORKDIR /app
COPY src ./src
COPY fixtures ./fixtures
EXPOSE 4017
CMD ["node", "src/server.mjs"]