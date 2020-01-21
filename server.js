const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const db = config.get("mongoURI");
app.use(bodyParser.json());
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error in connecting to DB: " + err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
