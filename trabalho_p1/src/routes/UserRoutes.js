const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários registrados no sistema.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: O ID do usuário.
 *                   name:
 *                     type: string
 *                     description: O nome do usuário.
 *                   email:
 *                     type: string
 *                     description: O email do usuário.
 *       500:
 *         description: Erro no servidor ao tentar buscar os usuários.
 */
router.get("/user", UserController.index);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criação de um novo usuário
 *     description: Cria um novo usuário com nome, email e senha.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Requisição inválida.
 */
router.post("/user", UserController.store);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login de um usuário
 *     description: Realiza o login de um usuário existente com email e senha.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário.
 *               password:
 *                 type: string
 *                 description: A senha do usuário.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: O token JWT.
 *       400:
 *         description: Credenciais inválidas (usuário não encontrado ou senha incorreta).
 */
router.post("/user/login", UserController.login);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     description: Atualiza as informações de um usuário existente, como nome, email e senha.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: O novo nome do usuário.
 *               email:
 *                 type: string
 *                 description: O novo email do usuário.
 *               password:
 *                 type: string
 *                 description: A nova senha do usuário.
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro na requisição (por exemplo, dados inválidos).
 *       404:
 *         description: Usuário não encontrado.
 */
router.put("/user/:id", UserController.update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     description: Remove um usuário existente do sistema.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do usuário a ser deletado.
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (sem conteúdo).
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete("/user/:id", UserController.delete);

module.exports = router;
