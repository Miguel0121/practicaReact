const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const sql = require('./db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello/:id', (req, res) => {//metodo que se encarga de consultar un usuario en la base de datos de usuarios  
      sql.query('SELECT * FROM users WHERE id = ?', req.params.id, (error, result) => {
        if (result) throw res.send("El usuario no existe");
        res.send("El nombre del usuario es: "+result[0].name+"   y el correo es: "+result[0].email);
      });
});

app.post('/api/world', (req, res) => {//metodo que se encarga de crear un usuario en la base de datos de usuarios
  sql.query('INSERT INTO users SET ?', req.body, (error, result) => {
      res.send(`El usuario con identificador: ${result.insertId}`+' se creo correctamente',);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));