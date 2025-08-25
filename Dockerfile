FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build -- --configuration production \
 && echo "=== DIST TREE ===" \
 && find dist -maxdepth 3 -type d -print \
 && DIST_DIR="$(find dist -maxdepth 2 -type d -name browser -print -quit)" \
 && if [ -z "$DIST_DIR" ]; then \
      DIST_DIR="$(find dist -maxdepth 1 -mindepth 1 -type d -print -quit)"; \
    fi \
 && echo "Using DIST_DIR=$DIST_DIR" \
 && mkdir -p /out \
 && cp -r "$DIST_DIR"/* /out/

# ---- run (nginx) ----
FROM nginx:alpine
# borra la página por defecto
RUN rm -rf /usr/share/nginx/html/*
# copia el build ya "planchado"
COPY --from=build /out/ /usr/share/nginx/html/
EXPOSE 80
