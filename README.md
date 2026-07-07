# INA-Track

Proyecto completo para abrir directamente en VS Code.

## Requisitos

- Node.js 20 o superior
- VS Code

## Como usar

1. Abre la carpeta `INA-Track` en VS Code.
2. Abre la terminal integrada.
3. Ejecuta:

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

## Usuarios demo

Todos usan la contrasena:

```text
demo123
```

- Estudiante: `valeria@ina-track.test`
- Docente: `marco@ina-track.test`
- Administrador: `admin@ina-track.test`

## Modulos funcionales

1. Login y registro
2. Roles: estudiante, docente y administrador
3. Sistema de asistencia
4. Dashboard del estudiante
5. XP y niveles
6. Logros y rachas
7. Atlas IA local

## Persistencia

Para que funcione sin configurar PostgreSQL al inicio, el backend guarda datos en:

```text
backend/src/data/database.json
```

Si borras ese archivo, se vuelve a crear con datos demo.

## PostgreSQL

El diseno SQL esta en:

```text
database/schema.sql
```
