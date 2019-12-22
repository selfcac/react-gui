import express from 'express';
import {Domain} from '../../commons/Classes/Domain'

const app = express();
const port = 3033;

app.get('/newDomain', (req, res) => {
  res.send(new Domain("Domain", false));
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});