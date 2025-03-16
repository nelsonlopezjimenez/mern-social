//  imports
import express from 'express';

//  app declaration
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send("Hello World!!")
})

app.listen(PORT);
