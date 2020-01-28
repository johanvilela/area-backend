require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// MogoDB Local
// const mongoDB = 'mongodb://127.0.0.1/my_database';

// MogoDB Atlas
// const mongoDB = 'mongodb+srv://omnistack:omnistack@cluster0-wmkd0.mongodb.net/week10?retryWrites=true&w=majority';

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);