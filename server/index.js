require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/soundDataBase',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/sounds', (req, res, next) => {
  const sql = `
  select "fileUrl",
  "soundId"
  from "sounds"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/sounds/:soundId', (req, res, next) => {
  const soundId = Number(req.params.soundId);
  const sql = `
  select "soundId",
          "fileUrl"
  from "sounds"
  where "soundId" = $1
  `;
  const params = [soundId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
