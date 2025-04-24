#step1: Build Angular App
From node:18-alpine as bbuilder

WORKDIR /Ap
COPY . .
RUN npm install
RUN npm run build --configuration production

#step2 : Serve APP with Nginx
From nginx:alpine

#Copy built app to nginx html folder
COPY --from=builder /app/dist/<EcommerceWenAngular2025> /usr/share/nginx/html

#Copy custome nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx","-g","daemon off;"]