/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');

const app = express();
app.use(cors());

const DB_URI = `mongodb+srv://${process.env.MONGODB_USER_ADMIN_USERNAME}:${process.env.MONGODB_USER_ADMIN_PASSWORD}@general-91kb5.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }).catch((error) => {
  throw new Error(`Connection to MongoDB database failed.\n${error}`);
});
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
