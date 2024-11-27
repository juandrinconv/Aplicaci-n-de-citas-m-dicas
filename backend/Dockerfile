# Usa una imagen oficial de Python como base
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /project_sena_test/backend

# Copia solo los archivos necesarios para instalar dependencias
COPY requirements.txt requirements.txt

# Instala las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código del proyecto al contenedor
COPY . /project_sena_test/backend

# Expone el puerto en el que Django servirá la aplicación (por defecto 8000)
EXPOSE 8000

# Define el comando por defecto para ejecutar la aplicación
CMD ["gunicorn", "--chdir", "/project_sena_test/backend", "main_folder.wsgi:application", "--bind", "0.0.0.0:8000"]


