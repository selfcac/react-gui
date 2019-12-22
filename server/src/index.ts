import express from 'express';
import {Domain} from '../../commons/Classes/Domain'
import {API, API_PORT} from '../../commons/API'

const app = express();

app.get(API.GET_DOMAIN, (req, res) => {
  res.send(new Domain("Domain " + Math.ceil(Math.random() * 1000)));
});

app.listen(API_PORT, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${API_PORT}`);
});