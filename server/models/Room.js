const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        match: /^\w+$/
    },
    users: [String],
    chatMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

RoomSchema.plugin(uniqueValidator, { message: 'is already taken' });

RoomSchema.methods.toJSON = function () {
    return {
        name: this.name,
        users: this.users,
        chatMessages: this.chatMessages.map(message => message.toJSON())
    }
}

mongoose.model('Room', RoomSchema);