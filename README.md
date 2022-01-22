# Challenge BACKEND NodeJS

## Construcción 🛠️

    - Validaciones con "express validator" - (Las validaciones están hechas todas en ingles);
    - Encriptación de contraseñas con "bcrypt";
    - Para las variables de entorno utilice "dotenv";
    - Utilización de "jsonwebtoken", el usuario al registrarse se genera un token y 
      luego después que se loguea lo obtiene. Ese token sirve para que pueda acceder 
      al servicio completo de la APIDISNEY si no existe un token en cada petición que 
      el usuario realice hay un middleware que se encarga de validar eso;
    - Utilización del ORM "sequelize" para la base de dato relacional en este caso MySQL;
    - Implementación del servicio de correo con "nodemailer" para que al momento en el 
      que el usuario se registra es enviado un mail de bienvenida.

------------------

### [Documentación APIDISNEY 📦](https://documenter.getpostman.com/view/17864000/UVXnJF3K)

-----------------

## Estructura de archivos 🚀

<img src="/git/1.png" alt="ESTRUCTURA DE ARCHIVOS">

## Validaciones 📋

<img src="/git/2.gif" alt="VALIDACIONES">

----------------

## Instalación para pruebas 🔧

### En consola :

    - npm install
    - importar el script "disney_db.sql"
    - npm run dev

----------------   
