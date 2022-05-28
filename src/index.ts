import express, { Application, Response, Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import Ratelimit from 'express-rate-limit';

const app: Application = express();
const port = 3000;

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

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'hello World from post',
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`server is on localhost:${port}`);
});
export default app;
