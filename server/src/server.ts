import express from 'express';
import {DomainItem} from '../../client/src/commons/Classes/DomainItem'
import {API, API_PORT} from '../../client/src/commons/API'

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toTimeString()} ${req.method} ${req.path}`)
  res.set('Access-Control-Allow-Origin', '*');
  next();
})

app.get(API.GET_DOMAIN, (req, res) => { 
  res.send(new DomainItem("Domain " + Math.ceil(Math.random() * 1000),true));
});

app.listen(API_PORT, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`👍 server is listening on ${API_PORT}`);
});