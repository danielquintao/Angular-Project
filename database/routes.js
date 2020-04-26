const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.post('/postmovie', (req, res, next) => {
    db.query('INSERT INTO movies (name) VALUES (?)', [req.body.name],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/getmovies', function (req, res, next) {
    db.query(
       'SELECT * FROM movies', [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put("/putmovie/:id", function (req, res, next) {
    db.query(
       'UPDATE movies SET name = ? WHERE id = ?', [req.body.name, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/deletemovie/:id', function (req, res, next) {
    db.query(
      'DELETE * FROM movies WHERE id = ?', [req.params.id],
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;