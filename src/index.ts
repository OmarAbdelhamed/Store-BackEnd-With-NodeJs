import express, { Application } from 'express';

const app: Application = express();
const port = 3000;
app.listen(port, () => {
  app.get('/', (req, res) => {
    res.send('hello world');
  });
  console.log(`server is on localhost:${port}`);
});
export default app;
