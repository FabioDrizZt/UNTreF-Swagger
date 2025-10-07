const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Películas y Actores",
    version: "1.0.0",
    description:
      "API RESTful para gestionar películas y actores con sus relaciones",
    contact: {
      name: "fabi0x",
      email: "ing.fabio.arg@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    schemas: {
      Actor: {
        type: "object",
        required: ["first_name", "last_name"],
        properties: {
          actor_id: {
            type: "integer",
            description: "ID único del actor",
            example: 1,
          },
          first_name: {
            type: "string",
            description: "Nombre del actor",
            example: "Leonardo",
          },
          last_name: {
            type: "string",
            description: "Apellido del actor",
            example: "DiCaprio",
          },
        },
      },
      Film: {
        type: "object",
        required: ["title"],
        properties: {
          film_id: {
            type: "integer",
            description: "ID único de la película",
            example: 1,
          },
          title: {
            type: "string",
            description: "Título de la película",
            example: "Inception",
          },
          description: {
            type: "string",
            description: "Descripción de la película",
            example:
              "Un thriller de ciencia ficción sobre sueños dentro de sueños",
          },
          release_year: {
            type: "integer",
            description: "Año de lanzamiento",
            example: 2010,
          },
        },
      },
      ActorInput: {
        type: "object",
        required: ["first_name", "last_name"],
        properties: {
          first_name: {
            type: "string",
            description: "Nombre del actor",
            example: "Leonardo",
          },
          last_name: {
            type: "string",
            description: "Apellido del actor",
            example: "DiCaprio",
          },
        },
      },
      FilmInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            description: "Título de la película",
            example: "Inception",
          },
          description: {
            type: "string",
            description: "Descripción de la película",
            example:
              "Un thriller de ciencia ficción sobre sueños dentro de sueños",
          },
          release_year: {
            type: "integer",
            description: "Año de lanzamiento",
            example: 2010,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Mensaje de error",
            example: "Recurso no encontrado",
          },
          description: {
            type: "string",
            description: "Descripción detallada del error",
            example: "El actor con ID 999 no existe en la base de datos",
          },
        },
      },
    },
    responses: {
      NotFound: {
        description: "Recurso no encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      BadRequest: {
        description: "Solicitud incorrecta",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
      InternalServerError: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Rutas donde están las anotaciones JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
