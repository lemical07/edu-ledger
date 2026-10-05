# academia_edu-ledger

Aplicación de gestión académica por consola desarrollada con Node.js, ES Modules y MySQL.

## Requisitos

- Node.js 18 o superior.
- MySQL 8 o compatible.
- Una base de datos MySQL disponible para la aplicación.

## Tecnologías

- Node.js
- JavaScript con ES Modules
- MySQL
- mysql2
- inquirer
- chalk
- dotenv

No se utilizan frameworks, ORM ni dependencias adicionales.

## UML Diagram

## Diagrama UML

[Ver diagrama UML](./docs/)

## Estructura

```text
academia_edu-ledger/
├── index.js
├── package.json
├── README.md
├── .env.example
├── .gitignore
├── database/
│   ├── database.js
│   └── schema.sql
│   └── seed.sql
├── models/
│   ├── identification-types.model.js
│   ├── cities.model.js
│   ├── students.model.js
│   ├── teachers.model.js
│   ├── classrooms.model.js
│   ├── courses.model.js
│   ├── topics.model.js
│   ├── courses-schedules.model.js
│   ├── inscriptions.model.js
│   └── rates.model.js
├── factories/
│   └── model.factory.js
├── repositories/
│   ├── base.repository.js
│   ├── identification-types.repository.js
│   ├── cities.repository.js
│   ├── students.repository.js
│   ├── teachers.repository.js
│   ├── classrooms.repository.js
│   ├── courses.repository.js
│   ├── topics.repository.js
│   ├── courses-schedules.repository.js
│   ├── inscriptions.repository.js
│   └── rates.repository.js
├── services/
│   ├── base.service.js
│   ├── identification-types.service.js
│   ├── cities.service.js
│   ├── students.service.js
│   ├── teachers.service.js
│   ├── classrooms.service.js
│   ├── courses.service.js
│   ├── topics.service.js
│   ├── courses-schedules.service.js
│   ├── inscriptions.service.js
│   └── rates.service.js
└── commands/
    ├── crud.command.js
    └── menu.command.js
```

## Instalación

1. Crear una base de datos MySQL. Por ejemplo:

```sql
CREATE DATABASE academia_edu_ledger;
```

2. Seleccionar la base de datos y ejecutar `database/schema.sql`.

3. Copiar `.env.example` como `.env`:

```bash
cp .env.example .env
```

En Windows también puede copiarse manualmente el archivo y renombrarlo a `.env`.

4. Configurar las credenciales de MySQL en `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=academia_edu_ledger
```

5. Instalar las dependencias:

```bash
npm install
```

## Ejecución

```bash
npm start
```

El punto de entrada único es `index.js`.

## Operaciones disponibles

Cada entidad dispone de:

- Listar
- Buscar
- Crear
- Actualizar
- Eliminar
- Volver

Los estudiantes y maestros pueden localizarse por número de identificación o nombre completo.

Los temas, aulas, cursos, ciudades y tipos de identificación se localizan por código.

Las calificaciones, inscripciones y horarios de cursos se localizan por ID.

Para actualizar se selecciona exactamente un campo modificable. El `id` nunca se actualiza.

Para eliminar primero se localiza y muestra el registro y después se solicita confirmación. La opción predeterminada es `No`.

## Arquitectura

```text
index.js
   │
   ├── Commands ──► Services ──► Repositories ──► MySQL
   │                    │
   │                    └── validaciones y reglas
   │
   └── ModelFactory ──► Models
```

### Models

Representan únicamente los datos. Cada entidad tiene atributos privados, constructor, getters y setters explícitos.

### Factory

`ModelFactory` es el único punto que conoce las clases concretas de los modelos. Los repositorios crean modelos mediante `ModelFactory.crear(...)`.

### Repositories

`BaseRepository` concentra las operaciones CRUD comunes. Los repositorios concretos definen la tabla, el modelo, las columnas permitidas y los criterios de búsqueda.

Todo el SQL está contenido en `database/` y `repositories/`.

### Services

Validan los datos antes de llegar a la base de datos y traducen errores frecuentes de MySQL a mensajes comprensibles.

### Commands

Gestionan exclusivamente la interacción con el usuario mediante Inquirer y Chalk. El CRUD se implementa con un comando genérico reutilizable.

## Nota sobre los identificadores

Los campos `id` se definieron como `AUTO_INCREMENT` para permitir que MySQL genere los identificadores al crear registros. Esto no altera las tablas, columnas ni relaciones indicadas en el esquema funcional; es una decisión de implementación para que los identificadores PK puedan generarse automáticamente.
