const userService = require("../services/UserService");

class UserController {
    async index(request, response) {
        try {
            const users = await userService.getAllUsers();
            response.status(200).json(users);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    async login(request, response) {
        const { email, password } = request.body;
        try {
            const token = await userService.loginUser(email, password);
            response.status(200).json({ token });
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async store(request, response) {
        const { name, email, password } = request.body;
        try {
            const newUser = await userService.createUser({ name, email, password });
            response.status(201).json(newUser);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async update(request, response) {
        const { id } = request.params; 
        const { name, email, password } = request.body; 
        try {
            const updatedUser = await userService.updateUser(id, { name, email, password });
            if (!updatedUser) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
            response.status(200).json(updatedUser);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        try {
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
            response.status(204).send(); 
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

// Usar Singleton
module.exports = new UserController();
