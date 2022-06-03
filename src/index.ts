import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import Ratelimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import routes from './routes';

const app: Application = express();
const port = config.port || 3000;

//middlewear to parse incoming requests
app.use(express.json());
//logging middle wear
app.use(morgan('common'));
// http security middle wear
app.use(helmet());
//apply the rate limiting middleware to all requests
app.use(
  Ratelimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Toomany requests from this IP, Please try again after an hour',
  })
);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'ohh you are lost go back to mama',
  });
});

app.listen(port, () => {
  console.log(`server is on localhost:${port}`);
});
export default app;
