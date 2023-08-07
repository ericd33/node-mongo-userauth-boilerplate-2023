const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter')
require('dotenv').config();

/// Connecting to mongo
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

try {
    const {
        DB_USER,
        DB_PASSWORD,
        DB_HOST,
        DB_PORT,
        DB_NAME,
      } = process.env;

  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use('/', authRouter);


app.listen(process.env.NODE_LOCAL_PORT, ()=> {
    console.log('Server is running on port 3000');
})