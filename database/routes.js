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

  router.post('/postdirector', (req, res, next) => {
    db.query('INSERT INTO directors (name) VALUES (?)', [req.body.name],
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

  router.post('/poststudio', (req, res, next) => {
    db.query('INSERT INTO studios (name) VALUES (?)', [req.body.name],
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

  router.post('/postactor', (req, res, next) => {
    db.query('INSERT INTO actors (name) VALUES (?)', [req.body.name],
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

  router.put('/associate_movie_and_director', (req, res, next) => {
    db.query('UPDATE movies SET director_id = ? WHERE id = ?', [req.body.director, req.body.movie],
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

  router.put('/associate_movie_and_studio', (req, res, next) => {
    db.query('UPDATE movies SET studio_id = ? WHERE id = ?', [req.body.studio, req.body.movie],
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

  router.post('/associate_movie_and_actor', (req, res, next) => {
    db.query('INSERT INTO movies_actors (movie_id, actor_id) VALUES (?, ?)', [req.body.movie, req.body.actor],
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

  router.post('/associate_movie_and_genre', (req, res, next) => {
    db.query('INSERT INTO movies_genres (movie_id, genre_id) VALUES (?, ?)', [req.body.movie, req.body.genre],
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

  router.get('/getmovies/:keyword?', function (req, res, next) {
     if(req.params.keyword) { 
      db.query(
        'SELECT * FROM movies WHERE name LIKE ?', ['%'+req.params.keyword+'%'], // 'SELECT m.* FROM movies m, directors d WHERE (m.name LIKE ?) OR (m.director_id = d.id AND d.name LIKE ?);', ['%'+req.params.keyword+'%', '%'+req.params.keyword+'%'],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
     }
     else {
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
     }

  });

  router.get('/getdirectors/:keyword?', function (req, res, next) {
    if(req.params.keyword) { 
     db.query(
       'SELECT * FROM directors WHERE name LIKE ?', ['%'+req.params.keyword+'%'], // 'SELECT m.* FROM movies m, directors d WHERE (m.name LIKE ?) OR (m.director_id = d.id AND d.name LIKE ?);', ['%'+req.params.keyword+'%', '%'+req.params.keyword+'%'],
       (error, results) => {
         if (error) {
           console.log(error);
           res.status(500).json({status: 'error'});
         } else {
           res.status(200).json(results);
         }
       }
     );
    }
    else {
     db.query(
       'SELECT * FROM directors', [],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
    }

 });

 router.get('/getstudios/:keyword?', function (req, res, next) {
  if(req.params.keyword) { 
   db.query(
     'SELECT * FROM studios WHERE name LIKE ?', ['%'+req.params.keyword+'%'],
     (error, results) => {
       if (error) {
         console.log(error);
         res.status(500).json({status: 'error'});
       } else {
         res.status(200).json(results);
       }
     }
   );
  }
  else {
   db.query(
     'SELECT * FROM studios', [],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
  }

});

router.get('/getactors/:keyword?', function (req, res, next) {
  if(req.params.keyword) { 
   db.query(
     'SELECT * FROM actors WHERE name LIKE ?', ['%'+req.params.keyword+'%'],
     (error, results) => {
       if (error) {
         console.log(error);
         res.status(500).json({status: 'error'});
       } else {
         res.status(200).json(results);
       }
     }
   );
  }
  else {
   db.query(
     'SELECT * FROM actors', [],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
  }

});

router.get('/getgenres/:keyword?', function (req, res, next) {
  if(req.params.keyword) { 
   db.query(
     'SELECT * FROM genres WHERE name LIKE ?', ['%'+req.params.keyword+'%'],
     (error, results) => {
       if (error) {
         console.log(error);
         res.status(500).json({status: 'error'});
       } else {
         res.status(200).json(results);
       }
     }
   );
  }
  else {
   db.query(
     'SELECT * FROM genres', [],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
  }

});

router.get('/getmovieinfo-director/:keyword', function (req, res, next) { 
 db.query(
   'SELECT d.* FROM directors d, movies m WHERE (d.id = m.director_id) AND (m.id = ?)', [req.params.keyword],
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

router.get('/getmovieinfo-studio/:keyword', function (req, res, next) { 
  db.query(
    'SELECT s.* FROM studios s, movies m WHERE (s.id = m.studio_id) AND (m.id = ?)', [req.params.keyword],
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

 router.get('/getmovieinfo-actors/:keyword', function (req, res, next) { 
  db.query(
    'SELECT a.* FROM actors a, movies_actors m_a, movies m WHERE (a.id = m_a.actor_id) AND (m.id = m_a.movie_id) AND (m.id = ?)', [req.params.keyword],
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

 router.get('/getmovieinfo-genres/:keyword', function (req, res, next) { 
  db.query(
    'SELECT g.* FROM genres g, movies_genres m_g, movies m WHERE (g.id = m_g.genre_id) AND (m.id = m_g.movie_id) AND (m.id = ?)', [req.params.keyword],
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

  router.put("/putmovie", function (req, res, next) {
    db.query(
       'UPDATE movies SET name = ? WHERE id = ?', [req.body.name, req.body.id],
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
      'DELETE FROM movies WHERE id = ?', [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/deletedirector/:id', function (req, res, next) {
    db.query(
      'DELETE FROM directors WHERE id = ?', [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/deletestudio/:id', function (req, res, next) {
    db.query(
      'DELETE FROM studios WHERE id = ?', [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/deleteactor/:id', function (req, res, next) {
    db.query(
      'DELETE FROM actors WHERE id = ?', [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/unassociate-movie-and-actor/:movie_id/:actor_id', function (req, res, next) {
    db.query(
      'DELETE FROM movies_actors WHERE movie_id = ? AND actor_id = ?', [req.params.movie_id, req.params.actor_id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.delete('/unassociate-movie-and-genre/:movie_id/:genre_id', function (req, res, next) {
    db.query(
      'DELETE FROM movies_genres WHERE movie_id = ? AND genre_id = ?', [req.params.movie_id, req.params.genre_id],
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