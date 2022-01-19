FROM node:16.13.0-alpine as app
WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm install 
COPY . .

RUN chown -R nobody: /usr/src/app
USER nobody

CMD npm run generate
CMD npm run dev

EXPOSE 3000
