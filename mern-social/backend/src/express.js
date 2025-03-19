//  imports
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';


//  app declaration
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({'error': err.name + ": " + err.message})
    } else if (err) {
        res.status(401).json({ "error": err.name + ": " + err.message})
        console.log(err);
    }
})

export default app;
