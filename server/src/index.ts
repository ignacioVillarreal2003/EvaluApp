import express from 'express'
import { IEncuesta } from './IEncuesta'
import { IPregunta } from './IPregunta'
import { IOpcion } from './IOpcion'
import { createServer } from 'http';

/* Configuracion */
const app = express()
app.use(express.json()) 

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE"
};

app.use(cors(corsOptions));

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

httpServer.listen(3002);

/* Operaciones */

const listaEncuestas: IEncuesta[] = []
const resultadosEncuestas: IEncuesta[] = [];

app.get('/getEncuestas', (req: any, res: any) => {
  return res.status(200).send(listaEncuestas);
});

app.get('/getResultados', (req: any, res: any) => {
  return res.status(200).send(resultadosEncuestas);
});

app.post('/checkPin', (req: any, res: any) => {
  const pin: String = req.body.pin
  listaEncuestas.forEach(e => {
    if (e.pin === pin) {
      return res.status(200).send({ message: 'Encuesta encontrada.' });
    }
  });
  return res.status(400).send({ message: 'Encuesta no encontrada. Verifique el pin.' });
});

app.post('/subirEncuesta', (req: any, res: any) => {
  const encuesta: IEncuesta = req.body.encuesta
  listaEncuestas.forEach(e => {
    if (e.pin === encuesta.pin) {
      return res.status(400).send({ message: 'Encuesta con pin existente.' });
    }
  });
  listaEncuestas.push(encuesta)
  return res.status(200).send({ message: 'Encuesta subida con exito.' });
});

app.get('/getEncuesta/:pin', (req: any, res: any) => {  
  const pin: String = req.params.pin
  listaEncuestas.forEach(e => {
    if (e.pin === pin) {
      return res.status(200).send({ encuesta: e });
    }
  });
  return res.status(400).send({ message: 'Encuesta no encontrada. Verifique el pin.' });
});



app.post('/subirResultadosEncuesta', (req: any, res: any) => {
  const resultados: IEncuesta = req.body.resultados;  
  resultadosEncuestas.push(resultados);

  const encuestaCorrespondiente = listaEncuestas.find(encuesta => encuesta.pin === resultados.pin);
  if (!encuestaCorrespondiente) {
    return res.status(400).send({ message: 'Encuesta no encontrada.' });
  }

  // Modificar las calificaciones en la instancia de la encuesta correspondiente
  encuestaCorrespondiente.preguntas.forEach((pregunta: IPregunta) => {
    resultados.preguntas.forEach((preguntaResultado: IPregunta) => {
      if (pregunta.titulo === preguntaResultado.titulo) {
        pregunta.opciones.forEach((opciones: IOpcion) => {
          preguntaResultado.opciones.forEach((opcionesResultado: IOpcion) => {
            if (opciones.titulo === opcionesResultado.titulo) {
              console.log(opciones.titulo);
              console.log(opciones.calificacion);
              console.log(opcionesResultado.calificacion); // OpcionesResultado.calificacion es siempre uno mas que opciones.calificacion
              opciones.calificacion = (opciones.calificacion as number) + (opcionesResultado.calificacion as number);
            }
          });
        });
      }
    });
  });
  enviarEncuesta(encuestaCorrespondiente);
  return res.status(200).send({ message: 'Resultados subidos con éxito.' });
});


export function enviarEncuesta(encuesta: IEncuesta) {
    io.emit('encuesta', encuesta);
}

// socket.io
io.on('connection', (socket: any) => {
  console.log('user ' + socket.id.substr(0, 2) + ' connected');

  socket.on('disconnect', () => {
    console.log('user ' + socket.id.substr(0, 2) + ' disconnected!');
  });
});

