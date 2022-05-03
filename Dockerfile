FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json  /app/
RUN npm install
RUN npm update		
COPY . /app
ENTRYPOINT ["npm"]
CMD ["run","server"]
