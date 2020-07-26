const mongoose = require('mongoose');
const router = require('express').Router();

const Room = mongoose.model('Room');
const Message = mongoose.model('Message');

router.get('/', function (req, res, next) {
    return Room.find().populate('chatMessages').then(rooms => {
        res.status(200);
        return res.json(rooms.map(room => room.toJSON()));
    }).catch(next);
});

router.post('/create/', function (req, res, next) {
    const newRoom = new Room({
        name: req.body['room_name'],
        users: [],
        chatMessages: []
    });

    return newRoom.save().then(() => {
        console.log('Created room: ' + req.body['room_name']);

        res.status(201);
        return res.json({
            room_name: req.body['room_name']
        });
    }).catch(next);
});

router.post('/send_chat_message/', function(req, res, next) {
    if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('message')) {
        const err = new Error('Author or message cannot be missing');
        err.status = 400;
        next(err);
    }

    if (req.body['author'] === '') {
        req.body['author'] = 'anon';
    }
    return Room.findOne({ name: req.body['room_name'] }).then(room => {
        const msg = new Message({
            author: req.body['author'],
            text: req.body['message']
        });

        return msg.save().then(() => {
            room.chatMessages.push(msg);

            return room.save().then(() => {
                res.status(200);
                return res.json();
            }).catch(next);
        }).catch(next);
    }).catch(next);
});

module.exports = router;