# Sistema de Gestión de Ingresos y Egresos

## Introducción
Este proyecto consiste en la implementación de un sistema para la gestión de ingresos y egresos, la gestión de usuarios, y la generación de reportes financieros.

## Tabla de Contenidos
- [Configuración del Entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Migración de Base de Datos](#migración-de-base-de-datos)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Despliegue en Vercel](#despliegue-en-vercel)

## Configuración del Entorno
### Prerrequisitos
- Node.js v18 o superior
- PostgreSQL
- Cuenta en [Auth0](https://auth0.com/)

### Variables de Entorno
Configura un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://[USER]:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://[USER]:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres"
        
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_ISSUER_BASE_URL=https://your_domain.auth0.com
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Instalación
1. Clonar repositorio:
   ```bash
   git clone <repository_url>
   cd <project_name>
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
## Migración de Base de Datos
Ejecuta las migraciones para crear las tablas necesarias en la base de datos PostgreSQL:
   ```bash
   npx prisma migrate dev
   
   ```

## Pruebas Unitarias
Ejecuta las pruebas unitarias con el siguiente comando:
```bash
   npm run test

   # también puedes utilizar
   npm run test:watch
   ```

## Despliegue en Vercel

Pasos para desplegar el proyecto en Vercel:

1. **Conectar el Repositorio a Vercel**
   - Ingresa a [Vercel](https://vercel.com/) e inicia sesión o crea una cuenta si no tienes una.
   - Desde el dashboard de Vercel, selecciona la opción **New Project**.
   - Conecta tu cuenta de GitHub, GitLab o Bitbucket, y selecciona el repositorio de este proyecto.

2. **Configura las Variables de Entorno**
   - Dentro de la configuración del proyecto en Vercel, dirígete a la sección **Settings > Environment Variables**.
   - Agrega las variables de entorno que configuraste en el archivo `.env` en el entorno de desarrollo local:

3. **Despliega el Proyecto**
   - Una vez configuradas las variables de entorno, selecciona la opción **Deploy**.
   - Vercel iniciará el proceso de construcción y despliegue de la aplicación. Una vez completado, verás la URL del proyecto desplegado.

