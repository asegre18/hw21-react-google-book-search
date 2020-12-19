require('dotenv')
  .config();
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log('yee'))
.catch(e => console.log(e));

mongoose.set('debug', true);

const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start the API server
app.listen(PORT, () =>
  console.log(`API Server now listening on PORT ${PORT}!`)
);
