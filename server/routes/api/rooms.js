const router = require('express').Router();

const RoomController = require('../../controllers/RoomController');

// Preload rooms on routes with ':room'
router.param('room', function (req, res, next, room_name) {
    RoomController.getRoom(room_name)
        .then(room => {
            if (!room) {
                const err = new Error('Room not found');
                err.status = 404;
                return next(err);
            }

            req.room = room;

            return next();
        })
        .catch(next);
});

router.get('/', function (req, res, next) {
    return RoomController.getRooms().then(rooms => {
        res.status(200);
        return res.json(rooms.map(room => room.toJSON()));
    }).catch(next);
});

router.get('/:room/', function (req, res) {
    res.status(200);
    return res.json(req.room);
});

router.post('/', function (req, res, next) {
    RoomController.createRoom(req.body['room_name']).then(() => {
        console.log('Created room: ' + req.body['room_name']);

        res.status(201);
        return res.json();
    }).catch(next);
});

router.post('/:room/send_chat_message/', function(req, res, next) {
    if (!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('message')) {
        const err = new Error('Author or message cannot be missing');
        err.status = 400;
        return next(err);
    }

    return RoomController.sendChatMessage(req.room, req.body['author'] || 'anon', req.body['message']).then(() => {
        res.status(204);
        return res.json();
    }).catch(next);
});

router.post('/:room/join/', function (req, res, next) {
   if (!req.body.hasOwnProperty('username')) {
       const err = new Error('Username is required to join room');
       err.status = 400;
       return next(err);
   }

   return RoomController.joinRoom(req.room, req.body['username']).then(() => {
       res.status(204);
       return res.json();
   }).catch(next);
});

router.post('/:room/change_username/', function (req, res, next) {
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('new_username')) {
        const err = new Error('Request is incomplete');
        err.status = 400;
        return next(err);
    }

    return RoomController.changeUserName(req.room, req.body['username'], req.body['new_username']).then(() => {
        res.status(204);
        return res.json();
    }).catch(next);
})

router.post('/:room/leave/', function (req, res, next) {
    if (!req.body.hasOwnProperty('username')) {
        const err = new Error('Username needs to be specified to leave room');
        err.status = 400;
        return next(err);
    }

    return RoomController.leaveRoom(req.room, req.body['username']).then(() => {
        res.status(204);
        return res.json();
    }).catch(next);
});

router.delete('/:room/', function (req, res, next) {
    return RoomController.deleteRoom(req.room)
        .then(() => {
            res.status(204);
            return res.json();
        })
        .catch(next);
});

module.exports = router;