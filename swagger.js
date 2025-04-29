const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"], // aquí Swagger buscará los comentarios
};

module.exports = swaggerJsdoc(options);