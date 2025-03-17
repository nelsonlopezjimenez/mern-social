//  imports
import app from './express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

//  MongoDB config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/testmern');
mongoose.connection.on('error', () => {
    throw new Error('unable to connect to database: ')
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World!!</h1>')
})

app.listen(PORT);
