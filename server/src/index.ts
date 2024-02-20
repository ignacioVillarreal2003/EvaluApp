import express from 'express';
import { ISurvey } from './ISurvey';
import { IQuestion } from './IQuestion';
import { IOption } from './IOption';
import { createServer } from 'http';

/* Configuration */
const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
};

app.use(cors(corsOptions));

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
    cors: { origin: '*' }
});

httpServer.listen(3002);

/* Operations */

const surveyList: ISurvey[] = [];
const surveyResultsList: ISurvey[] = [];

app.get('/getSurveys', (req: any, res: any) => {
    return res.status(200).send(surveyList);
});

app.get('/getResults', (req: any, res: any) => {
    return res.status(200).send(surveyResultsList);
});

app.post('/checkPin', (req: any, res: any) => {
    const pin: string = req.body.pin;
    surveyList.forEach(survey => {
        console.log(survey);
        if (survey.pin === pin) {
            return res.status(200).send({ message: 'Survey found.' });
        }
    });    
    return res.status(400).send({ message: 'Survey not found. Check the pin.' });
});

app.post('/publishSurvey', (req: any, res: any) => {
    const newSurvey: ISurvey = req.body.survey;
    console.log(newSurvey);
    surveyList.forEach(survey => {
        if (survey.pin === newSurvey.pin) {
            return res.status(400).send({ message: 'Survey with existing pin. Try again.' });
        }
    });
    surveyList.push(newSurvey);
    return res.status(200).send({ message: 'Survey uploaded successfully.' });
});

app.get('/getSurvey/:pin', (req: any, res: any) => {
    const pin: string = req.params.pin;
    surveyList.forEach(survey => {
        if (survey.pin === pin) {
            return res.status(200).send({ survey: survey });
        }
    });
    return res.status(400).send({ message: 'Survey not found. Check the pin.' });
});

app.post('/submitSurveyResults', (req: any, res: any) => {
    const results: ISurvey = req.body.results;
    surveyResultsList.push(results);

    const correspondingSurvey = surveyList.find(survey => survey.pin === results.pin);
    if (!correspondingSurvey) {
        return res.status(400).send({ message: 'Survey not found.' });
    }

    // Modify ratings in the corresponding survey instance
    correspondingSurvey.questions.forEach((question: IQuestion) => {
        results.questions.forEach((resultQuestion: IQuestion) => {
            if (question.title === resultQuestion.title) {
                question.options.forEach((option: IOption) => {
                    resultQuestion.options.forEach((resultOption: IOption) => {
                        if (option.title === resultOption.title) {
                            option.rating = (option.rating as number) + (resultOption.rating as number);
                        }
                    });
                });
            }
        });
    });
    sendSurvey(correspondingSurvey);
    return res.status(200).send({ message: 'Results uploaded successfully.' });
});

export function sendSurvey(survey: ISurvey) {
    io.emit('survey', survey);
}

// socket.io
io.on('connection', (socket: any) => {
    console.log('user ' + socket.id.substr(0, 2) + ' connected');

    socket.on('disconnect', () => {
        console.log('user ' + socket.id.substr(0, 2) + ' disconnected!');
    });
});
