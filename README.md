# Arquitectura Backend - Formulario Banco

En este README observará una descripcion de la arquitectura completa de la API. Además, verá al final los requisitos y como instalar.
- [Requisitos](#requisitos)
- [Instalación](#instalación)

## Descripción

Este backend fue desarrollado con Node.js y Express para recibir, consultar y administrar la información del formulario web, almacenándola en Microsoft SQL Server.

La arquitectura está organizada por capas para separar responsabilidades y facilitar el mantenimiento, las pruebas y futuras integraciones con la infraestructura del banco.

Además de almacenar la información del formulario, el backend permite:

- Consultar las solicitudes registradas.
- Obtener el detalle completo de una solicitud.
- Almacenar documentos asociados al cliente.
- Guardar información de vinculación completada por el asesor.
- Actualizar el estado de una solicitud.
- Mantener la integridad de los datos mediante transacciones SQL.

# Estructura del proyecto

- api-sqlserver/
- │
- ├── server.js
- │
- ├── .env
- │
- ├── uploads/
- │
- ├── config/
- │   ├── database.js
- │   └── multer.js
- │
- ├── controllers/
- │   ├── solicitudController.js
- │   ├── documentoController.js
- │   └── vinculacionClienteController.js
- │
- ├── services/
- │   ├── solicitudService.js
- │   ├── datoPreferenciaService.js
- │   ├── datoClienteService.js
- │   ├── datoLaboralService.js
- │   ├── datoFatcaService.js
- │   ├── datoPepService.js
- │   ├── datoAdicionalService.js
- │   ├── datoCuestionarioService.js
- │   ├── datoCuestionario2Service.js
- │   ├── datoDeclaracionService.js
- │   ├── datoDocumentoService.js
- │   ├── documentoService.js
- │   └── vinculacionClienteService.js
- │
- ├── routes/
- │   ├── solicitudes.js
- │   └── documentos.js
- │
- └── utils/
-     └── cleanData.js

# Flujo de información

Informacion normal 

- Frontend
-    │
-    ▼
- server.js
-    │
-    ▼
- Routes
-    │
-    ▼
- Controllers
-    │
-    ▼
- Services
-    │
-    ▼
- SQL Server

Carga de documentos

- Frontend
-    │
-    ▼
- POST /api/documentos
-    │
-    ▼
- Multer
-    │
-    ▼
- documentoController
-    │
-    ▼
- documentoService
-    │
-    ▼
- uploads/

---

# Descripción de archivos

## server.js

Punto de entrada del backend.

Responsabilidades:

- Crear servidor Express.
- Configurar middlewares.
- Registrar rutas.
- Iniciar aplicación.

---

## database.js

Gestiona la conexión con SQL Server.

La configuración utiliza variables almacenadas en el archivo .env, evitando colocar directamente las credenciales dentro del código.

Contiene información como:

- Servidor.
- Puerto.
- Base de datos.
- Usuario.
- Contraseña.
- Configuración de conexión.

---

## Multer

Configura Multer para gestionar los documentos enviados desde el frontend.

Responsabilidades:

- Recibir archivos.
- Definir la carpeta temporal o definitiva de almacenamiento.
- Generar nombres para los archivos.
- Controlar el tamaño máximo permitido por archivo.

---

## Routes

Las rutas definen los endpoints disponibles en la API y conectan cada petición con su controller correspondiente.

- POST /api/solicitudes
- Crea una nueva solicitud completa.

- GET /api/solicitudes
- Obtiene el listado de solicitudes utilizado por el panel administrativo.

- GET /api/solicitudes/:id
- Obtiene toda la información relacionada con una solicitud específica.

- POST /api/solicitudes/:id/vinculacion
- Guarda la información de vinculación completada por el asesor para una solicitud específica.

- POST /api/documentos
- Recibe y almacena los documentos seleccionados por el cliente.

---

## Controller

Los controllers reciben las peticiones provenientes del frontend y coordinan la comunicación con los services.

Responsabilidades principales:

- Obtener parámetros de la URL.
- Obtener datos enviados en req.body.
- Validar información básica.
- Limpiar los datos cuando corresponde.
- Llamar al service correspondiente.
- Manejar errores.
- Enviar la respuesta HTTP al frontend.

### solicitudController.js

Gestiona las operaciones principales relacionadas con las solicitudes.

Entre sus responsabilidades se encuentran:

- Crear una solicitud.
- Obtener el listado de solicitudes.
- Obtener una solicitud específica por IdSolicitud.

### documentoController.js

Gestiona las solicitudes relacionadas con la carga de documentos.

Recibe los archivos procesados por Multer y utiliza el servicio correspondiente para almacenarlos y preparar la información que será asociada posteriormente a la solicitud.

### vinculacionClienteController.js

Gestiona la información completada por el asesor en la sección de vinculación.

Obtiene el IdSolicitud desde la URL y envía los datos recibidos al service encargado de almacenarlos.

---

## Services

Los services contienen la lógica de acceso a datos y las operaciones relacionadas con SQL Server.

Cada sección importante del formulario posee su propio service.


### solicitudService

Coordina las operaciones principales relacionadas con una solicitud.

Durante la creación de una solicitud:

1. Inicia una transacción.
2. Crea el registro principal en Solicitud.
3. Obtiene el IdSolicitud.
4. Guarda las diferentes secciones del formulario.
5. Relaciona todas las tablas mediante IdSolicitud.
6. Confirma la transacción.

---

### datoPreferenciaService

Guarda las preferencias seleccionadas al inicio del formulario.

Nota: Las entidades relacionadas se almacenan de forma individual para mantener una estructura normalizada.

---

### datoClienteService

Guarda información personal del cliente.

Tabla:DatoCliente

---

### datoLaboralService

Guarda la información laboral del cliente.

Tabla: DatoLaboral

---

### datoFatcaService

Guarda la información relacionada con FATCA.

Tabla:DatoFatca

---

### datoPepService

Guarda la información relacionada con Personas Expuestas Políticamente (PEP).

Tabla: DatoPep

---

### datoAdicionalService

Guarda información adicional relacionada con productos, fondos, operaciones, beneficiarios y relaciones financieras del cliente.

Tabla principal: DatoAdicional

---

### datoCuestionarioService

Guarda la información correspondiente al primer cuestionario del formulario.

También permite manejar información asociada a operaciones financieras cuando existen múltiples valores relacionados con una misma solicitud.

---

### datoCuestionario2Service

Guarda la información correspondiente al segundo cuestionario financiero.

---

### datoDeclaracionService

Guarda la confirmación de la declaración jurada realizada por el cliente.

Tabla: DatoDeclaracion

---

### datoDocumentoService

Guarda en SQL Server la información relacionada con los documentos asociados a una solicitud.

---

### documentoService

Gestiona físicamente los documentos recibidos.

Entre sus responsabilidades se encuentran:

- Procesar los archivos enviados.
- Renombrarlos.
- Mantener su extensión original.
- Guardarlos en la carpeta correspondiente.
- Devolver la información necesaria para asociarlos posteriormente a una solicitud.

---

### datosVinculacion

Guarda la información completada por el asesor luego de revisar la solicitud.

Tabla: DatosVinculacion

---

---

## utils/cleanData

Contiene funciones auxiliares para limpiar y normalizar los datos recibidos.

Por ejemplo, permite convertir valores vacíos: "" en: null

---



# Manejo de transacciones

Durante la creación inicial de una solicitud, el sistema utiliza transacciones SQL para evitar almacenar información incompleta.

Proceso:
BEGIN TRANSACTION

INSERT Solicitud

INSERT DatoPreferencia

INSERT PreferenciaEntidad

INSERT DatoCliente

INSERT DatoLaboral

INSERT DatoFatca

INSERT DatoPep

INSERT DatoAdicional

INSERT DatoCuestionario

INSERT DatoCuestionario2

INSERT DatoDeclaracion

INSERT DatoDocumento

COMMIT


Si ocurre un error:

ROLLBACK

De esta forma se evita que una solicitud quede parcialmente registrada.

---

# Relación de tablas

- Solicitud
- │
- │ IdSolicitud
- │
- ├── DatoPreferencia
- │
- ├── PreferenciaEntidad
- │
- ├── DatoCliente
- │
- ├── DatoLaboral
- │
- ├── DatoFatca
- │
- ├── DatoPep
- │
- ├── DatoAdicional
- │
- ├── DatoCuestionario
- │
- ├── DatoCuestionario2
- │
- ├── DatoDeclaracion
- │
- ├── DatoDocumento
- │
- └── DatosVinculacion

Todas las tablas relacionadas utilizan IdSolicitud como referencia directa o como identificador principal para asociar la información con la solicitud correspondiente.

---

# Resumen del flujo

- Cliente completa formulario
-           │
-           ▼
- Frontend envía información
-           │
-           ▼
- POST /api/solicitudes
-           │
-           ▼
- Solicitud + tablas relacionadas
-           │
-           ▼
- SQL Server
-           │
-           ▼
- Administrador consulta solicitudes
-           │
-           ▼
- GET /api/solicitudes
-           │
-           ▼
- Administrador abre una solicitud
-           │
-           ▼
- GET /api/solicitudes/:id
-           │
-           ▼
- Administrador completa vinculación
-           │
-           ▼
- POST /api/solicitudes/:id/vinculacion
-           │
-           ▼
- DatosVinculacion
-           │
-           ├── Estado = Completado
-           │
-           └── FechaActualizacion


# Requisitos

Antes de ejecutar el backend es necesario tener instalado:

- Node.js
- npm
- Microsoft SQL Server
- Una base de datos configurada para el proyect

---

# Instalación

Después de clonar el repositorio, ingresar a la carpeta del backend:

bash
cd api-sqlserver

## Instalar las dependencias:
npm install

Esto instalará automáticamente las dependencias definidas en:
package.json

Entre las principales dependencias utilizadas se encuentran:
- Express
- mssql
- cors
- dotenv
- multer

## Variables de entorno

En el archivo .env, cambiar los datos de cada uno de los parametros.

- DB_SERVER=localhost
- DB_PORT=1433
- DB_DATABASE=NombreBaseDatos
- DB_USER=usuario
- DB_PASSWORD=contraseña
- PORT=3000

## Ejecutar el servidor

Una vez instaladas las dependencias y configurado el archivo .env, iniciar el backend con:
node server.js

Si todo está configurado correctamente, debería mostrarse por CONSOLA:
Servidor corriendo en http://localhost:3000

---

# Codigo para SQL SERVER

En el archivo sql-server-code.md esta el codigo para crear las tablas en el SQL server.