const pool = require('../model/database');
const messagingController = {};

//, renter.user_name, items.item_name, convos.created_at

messagingController.getConvos = (req, res, next) => {
    const query = {
        text: `SELECT convos.id, owner.user_name as owner, renter.user_name as renter, items.item_name, convos.created_at
               FROM convos
               INNER JOIN users owner
               ON (convos.user_owner_id = owner.id)
               INNER JOIN users renter
               ON (convos.user_renter_id = renter.id)
               INNER JOIN items
               ON (convos.item_id = items.id)
               WHERE convos.user_owner_id = $1
               OR convos.user_renter_id = $1`,
        values: [
            req.params.userId
        ]
    };
    pool.query(query.text, query.values, (err, convos) => {
        if (err) {
            console.log(`Error when getting convos: ${err}`);
        } else {
            res.locals.convos = convos.rows;
            next();
        }
    })
}

messagingController.getMessages = (req, res, next) => {
    const query = {
        text: `SELECT * FROM messages
               WHERE convo_id = $1`,
        values: [
            req.params.convoId
        ]
    };
    pool.query(query.text, query.values, (err, messages) => {
        if (err) {
            console.log(`Error when getting messages: ${err}`);
        } else {
            console.log(messages.rows);
            res.locals.messages = messages.rows;
            next();
        }
    });
}

messagingController.createConvo = (req, res, next) => {
    const query = {
        text: `INSERT INTO convos(user_owner_id, user_renter_id, item_id, created_at)
               VALUES($1, $2, $3, $4) RETURNING *`,
        values: [
            req.body.user_owner_id,
            req.body.user_renter_id,
            req.body.item_id,
            new Date().toISOString().slice(0, 19).replace('T', ' ')
        ]
    };

    pool.query(query.text, query.values, (err, convos) => {
        if (err) {
            console.log(`Error when creating convo: ${err}`);
        } else {
            res.locals.convo = convos.rows[0];
            next();
        }
    });
}

messagingController.createMessage = (req, res, next) => {
    const query = {
        text: `INSERT INTO messages(convo_id, user_sent_id, message, created_at)
               VALUES($1,$2,$3,$4) RETURNING *`,
        values: [
            req.body.convo_id,
            req.body.user_sent_id,
            req.body.message,
            new Date()
        ]
    };

    pool.query(query.text, query.values, (err, messages) => {
        if (err) {
            console.log(`Error when creating message: ${err}`);
        } else {
            res.locals.message = messages.rows[0];
            next();
        }
    })
}

module.exports = messagingController;