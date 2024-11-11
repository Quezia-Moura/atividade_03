const { Router } = require("express");
const RoomController = require("../controllers/RoomController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Criação de uma nova sala de reunião
 *     description: Cria uma nova sala de reunião com nome, descrição, capacidade e status ativo.
 *     tags:
 *       - Salas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *                 description: Capacidade máxima da sala.
 *               isActive:
 *                 type: boolean
 *                 description: Indica se a sala está ativa.
 *             required:
 *               - name
 *               - description
 *               - capacity
 *               - isActive
 *     responses:
 *       201:
 *         description: Sala criada com sucesso.
 *       400:
 *         description: Requisição inválida.
 */
router.post("/api/rooms", authMiddleware, RoomController.create);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Lista todas as salas de reunião
 *     description: Retorna uma lista de todas as salas de reunião cadastradas no sistema.
 *     tags:
 *       - Salas
 *     responses:
 *       200:
 *         description: Lista de salas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: O ID da sala.
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   capacity:
 *                     type: integer
 *                     description: A capacidade da sala.
 *                   isActive:
 *                     type: boolean
 *                     description: Indica se a sala está ativa.
 *       500:
 *         description: Erro no servidor ao tentar buscar as salas.
 */
router.get("/api/rooms", authMiddleware, RoomController.index);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Atualiza os dados de uma sala
 *     description: Atualiza as informações de uma sala de reunião existente, como nome, descrição, capacidade e status.
 *     tags:
 *       - Salas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da sala a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Sala não encontrada.
 */
router.put("/api/rooms/:id", RoomController.update);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Deleta uma sala
 *     description: Remove uma sala existente do sistema.
 *     tags:
 *       - Salas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da sala a ser deletada.
 *     responses:
 *       204:
 *         description: Sala deletada com sucesso (sem conteúdo).
 *       404:
 *         description: Sala não encontrada.
 */
router.delete("/api/rooms/:id", RoomController.delete);


/**
 * @swagger
 * /api/rooms/join:
 *   post:
 *     summary: Usuário entra em uma sala de reunião
 *     description: Permite que um usuário autenticado entre em uma sala de reunião existente.
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []  # Exige autenticação via token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: O ID da sala em que o usuário deseja entrar.
 *               userId:
 *                 type: string
 *                 description: O ID do usuário que deseja entrar na sala.
 *             required:
 *               - roomId
 *               - userId
 *     responses:
 *       200:
 *         description: Usuário entrou na sala com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário entrou na sala com sucesso"
 *       400:
 *         description: Erro na requisição. Por exemplo, se a sala não for encontrada ou o usuário já estiver na sala.
 *       401:
 *         description: Token de autenticação inválido ou ausente.
 *       404:
 *         description: Sala não encontrada.
 */
router.post("/api/rooms/join", authMiddleware, RoomController.join);

module.exports = router;
