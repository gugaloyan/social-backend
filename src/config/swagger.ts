import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3001;

const url =
  process.env.NODE_ENV === 'local'
    ? `http://localhost:${PORT}`
    : 'https://social-backend-production-3b37.up.railway.app/';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Website API',
      version: '1.0.0',
      description: 'Project API documentation',
    },
    servers: [
      {
        url,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
