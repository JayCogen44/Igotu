const pool = require('../model/database');


userController = {};

userController.addUser = (req, res, next) => {
  const query = {
    text: 'INSERT INTO users(user_name, user_password, user_email_address) VALUES($1, $2, $3) RETURNING *',
    values: [req.body.user_name, req.body.user_password, req.body.user_email_address]
  }
  console.log(req.body);
  pool.query(query.text, query.values, (err, user) => {
    if (err) {
      console.log('Here\'s the error: ' + err);
    } else {
      res.locals.data = user.rows[0];
      next();
    };
  });
};

module.exports = userController;