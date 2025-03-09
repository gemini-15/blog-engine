# Use an official Node.js runtime as a base image
FROM node:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Copy of the files into the container 
COPY ./blog/ /app/

# Clean install
RUN npm ci

# Build the React app
RUN npm run build


FROM nginx:alpine3.20 as production

ARG REACT_APP_API_URL

ENV NODE_ENV production

ENV REACT_APP_API_URL ${REACT_APP_API_URL}

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8888
# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
