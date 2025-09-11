
# Servic - Guía de instalación 🔧

Proyecto fullstack: Django + React para conectar usuarios con trabajadores por ubicación.

---

## 🐍 Backend - Django REST Framework

### 1. Clonar el repositorio
```bash  
git clone https://github.com/Entre-Devs/servic-react.git
```

### 2. Crear entorno virtual y activarlo
```bash  
python -m venv venv

# Activar entorno:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source env/bin/activate

```
### 3. Instalar dependencias
```bash
cd .\servic-app\
pip install -r requirements.txt
```
### 4. Crear base de datos y configurar archivo .env

### 5. Migraciones
```bash  
python manage.py makemigrations
python manage.py migrate
```
### 6. (Verifica) instalación de django-cors-headers
```bash  
pip install django-cors-headers
```
### 7. Ejecutar servidor
```bash  
python manage.py runserver
```
## ⚛️ Frontend - React

### 1. Ir al directorio frontend

#### Abrir otra terminar y ejecutar:
```bash  
cd .\frontend\
```
### 2. Instalar dependencias
```bash 
npm install
``` 
### 3. Instalar axios y react-router-dom
```bash 
npm install axios react-router-dom

Verifica en package.json:

json
"dependencies": {
  "axios": "^1.6.0",
  "react-router-dom": "^6.20.0",
  ...
}
```
### 4. Iniciar servidor React
```bash 
npm start
```

### ✅ Checklist de verificación

- [x] Login/registro funcional.
