FROM node:16

# Working Dir
WORKDIR /app

RUN npm i npm@latest -g

# Copy Package Json Files
COPY package*.json ./

# Install files
RUN npm install 

# Copy Source Files
COPY . /app

# Expose the Api Port
EXPOSE 8080

CMD ["npm", "start"]