# Usa una imagen de Node.js para construir la aplicación
FROM node:22.5.1 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Construye la aplicación Angular en modo producción
RUN npm run build --prod

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:stable-alpine

# Copia los archivos construidos en Angular al directorio que Nginx utiliza para servir contenido
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copia un archivo de configuración personalizado para Nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Comando de inicio para Nginx
CMD ["nginx", "-g", "daemon off;"]