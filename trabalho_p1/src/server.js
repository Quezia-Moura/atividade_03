const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectMongo = require("./config/mongo");
const userRoutes = require("./routes/UserRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(userRoutes);
app.use(roomRoutes);

connectMongo();

// Comunicação via WebSocket
io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected", socket.id);
    });

    socket.on("signal", (data) => {
        socket.to(data.roomId).emit("signal", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
        io.emit("user-disconnected", socket.id);
    });
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuários e de Salas de Reunião',
            version: '1.0.0',
            description: 'Documentação da API de Usuários e de Salas de Reunião',
        },
        host: 'localhost:3000', // Alterar para o seu host se for diferente
        basePath: '/',
    },
    apis: ['./src/routes/*.js'], // Caminho para seus arquivos de rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
