const mongoose = require('mongoose');

const Room = mongoose.model('Room');
const Message = mongoose.model('Message');

function getRooms () {
    return Room.find().populate('chatMessages');
}

function getRoom (room_name) {
    return Room.findOne({ name: room_name }).populate('chatMessages');
}

function createRoom (room_name) {
    const newRoom = new Room({
        name: room_name,
        users: [],
        chatMessages: []
    });

    return newRoom.save();
}

function joinRoom (room, username) {
    room.users.push(username);
    return room.save();
}

function changeUserName (room, username, new_username) {
    const userIndex = room.users.findIndex(user => user === username);

    if (userIndex === -1) {
        const err = new Error('User not in room');
        err.status = 400;
        throw err;
    }

    room.users.splice(userIndex, 1, new_username);
    return room.save()
}

function sendChatMessage (room, author, text) {
    const message = new Message({
        author: author || 'anon',
        text
    });

    return message.save().then(() => {
        room.chatMessages.push(message);
        return room.save();
    });
}

function leaveRoom (room, username) {
    const userIndex = room.users.findIndex(user => user === username);

    if (userIndex === -1) {
        const err = new Error('User not in room');
        err.status = 400;
        throw err;
    }

    room.users.splice(userIndex, 1);
    return room.save()
}

function deleteRoom (room) {
    return Room.deleteOne(room);
}

module.exports = {
    getRooms,
    getRoom,
    createRoom,
    joinRoom,
    changeUserName,
    sendChatMessage,
    leaveRoom,
    deleteRoom
};
