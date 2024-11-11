const roomRepository = require("../repositories/RoomRepository");

class RoomService {
    // Criação de uma nova sala
    async createRoom(roomData) {
        return await roomRepository.createRoom(roomData);
    }

    // Retorna todas as salas
    async getAllRooms() {
        return await roomRepository.getAllRooms();
    }

    // Atualiza uma sala existente
    async updateRoom(id, roomData) {
        const room = await roomRepository.getRoomById(id);
        if (!room) {
            throw new Error("Sala não encontrada");
        }
        return await roomRepository.updateRoom(id, roomData);
    }

    // Deleta uma sala
    async deleteRoom(id) {
        const room = await roomRepository.getRoomById(id);
        if (!room) {
            throw new Error("Sala não encontrada");
        }
        return await roomRepository.deleteRoom(id);
    }

    // Verifica e permite que um usuário entre em uma sala
    async joinRoom(roomId, userId) {
        const room = await roomRepository.getRoomById(roomId);
        if (!room || !room.isActive) {
            throw new Error("Sala não encontrada ou inativa");
        }

        return await roomRepository.joinRoom(roomId, userId);
    }
}

module.exports = new RoomService();
