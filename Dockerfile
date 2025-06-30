FROM node:20
WORKDIR /usr/src/react-server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5174
CMD ["npm", "run", "preview_docker"]