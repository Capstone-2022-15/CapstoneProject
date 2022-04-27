FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ./CapstoneProject/package.json  /app/
RUN npm install
RUN npm update		
COPY ./CapstoneProject /app
ENTRYPOINT ["npm"]
CMD ["run","server"]
