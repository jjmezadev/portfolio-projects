FROM node:22-alpine
WORKDIR /app
COPY src ./src
COPY fixtures ./fixtures
EXPOSE 4012
CMD ["node", "src/server.mjs"]