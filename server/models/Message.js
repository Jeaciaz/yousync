const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    author: String,
    text: String
});

MessageSchema.methods.toJSON = function () {
    return {
        author: this.author,
        text: this.text
    };
};

mongoose.model('Message', MessageSchema);