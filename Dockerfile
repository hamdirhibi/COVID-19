FROM node:10
 
WORKDIR /app

COPY . /app 

RUN npm install -g @angular/cli@latest 
RUN npm npm install -g @ionic/cli
RUN npm install 

EXPOSE 8100 35729

CMD ["ionic", "serve"]