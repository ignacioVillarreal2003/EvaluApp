const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE"
};

app.use(cors(corsOptions));
app.use(express.json())

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.post('/sendMail', (req, res) => {
    const mailOptions = createMailOptions(process.env.MAIL, req.body.correo, req.body.asunto, req.body.mensaje);
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).send( { error: 'Error al enviar correo' } );
            } else {
              res.status(200).send( { message: 'Correo enviado: ' + info.response } );
            }
          });
  });


// npm install -g nodemon
// nodemon index.js