import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.MYSQL_PASSWORD;

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password,
  database: 'test',
  charset: 'utf8mb4',
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello this is the backend');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const query =
    'INSERT INTO books (`title`, `description`, `cover`) VALUES (?)';
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book has been created');
  });
});

app.listen(8800, () => {
  console.log('Connected to backend!');
});
