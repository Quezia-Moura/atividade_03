const roomService = require("../services/RoomService");

class RoomController {
    // Criar nova sala
    async create(request, response) {
        const { name, description, capacity, isActive } = request.body; 
        try {
            const room = await roomService.createRoom({ name, description, capacity, isActive });
            response.status(201).json(room);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    // Listar todas as salas
    async index(request, response) {
        try {
            const rooms = await roomService.getAllRooms();
            response.status(200).json(rooms);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

    // Participar de uma sala existente
    async join(request, response) {
        const { roomId, userId } = request.body; 
        try {
            const room = await roomService.joinRoom(roomId, userId);
            if (!room) {
                return response.status(404).json({ message: "Sala não encontrada" });
            }
            response.status(200).json({ message: "Usuário entrou na sala com sucesso" });
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    // Atualizar sala existente
    async update(request, response) {
        const { id } = request.params; 
        const { name, description, capacity, isActive } = request.body; 
        try {
            const updatedRoom = await roomService.updateRoom(id, { name, description, capacity, isActive });
            if (!updatedRoom) {
                return response.status(404).json({ message: "Sala não encontrada" });
            }
            response.status(200).json(updatedRoom);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    // Deletar uma sala
    async delete(request, response) {
        const { id } = request.params; 
        try {
            const deletedRoom = await roomService.deleteRoom(id);
            if (!deletedRoom) {
                return response.status(404).json({ message: "Sala não encontrada" });
            }
            response.status(204).send(); 
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RoomController();
