FROM node:22-alpine
WORKDIR /app
COPY src ./src
COPY fixtures ./fixtures
EXPOSE 4023
CMD ["node", "src/server.mjs"]