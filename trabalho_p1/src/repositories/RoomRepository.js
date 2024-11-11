const Room = require("../models/RoomModel");

class RoomRepository {
    // Criação de nova sala
    async createRoom(roomData) {
        const room = new Room(roomData);
        return await room.save();
    }

    // Busca todas as salas
    async getAllRooms() {
        return await Room.find();
    }

    // Busca uma sala pelo ID
    async getRoomById(id) {
        return await Room.findById(id);
    }

    // Atualiza os dados de uma sala existente
    async updateRoom(id, roomData) {
        return await Room.findByIdAndUpdate(id, roomData, { new: true });
    }

    // Deleta uma sala pelo ID
    async deleteRoom(id) {
        return await Room.findByIdAndDelete(id);
    }

    // Verifica se um usuário pode entrar na sala
    async joinRoom(roomId, userId) {
        const room = await this.getRoomById(roomId);
        if (!room) {
            throw new Error("Sala não encontrada");
        }
        return room;
    }
}

module.exports = new RoomRepository();
