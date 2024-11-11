const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async getUserByID(id) {
        return await userRepository.getUserByID(id);
    }

    async getUserByEmail(email) {
        return await userRepository.getUserByEmail(email); 
    }

    async createUser(userData) {
        // Criptografar a senha antes de salvar
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        
        const existUser = await this.getUserByEmail(userData.email);
        if (existUser) {
            throw new Error("Email já existe");
        }
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
    
        // // Verifica se a senha corresponde ao hash
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     throw new Error("Senha incorreta");
        // }
    
        // Geração do token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    async updateUser(id, userData) {
        const user = await userRepository.getUserByID(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
    
        return await userRepository.updateUser(id, userData);
    }

    async deleteUser(id) {
        const user = await this.getUserByID(id);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return await userRepository.deleteUser(id);
    }
}

module.exports = new UserService();
