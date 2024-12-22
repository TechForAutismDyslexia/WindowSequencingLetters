const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const timeroute = require('./routes/timeroute');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/wordgame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(timeroute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
