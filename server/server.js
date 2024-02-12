const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Lists = require("./model/list");
const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/list")
  .then((result) => console.log("connected database"));

app.use(express.json());
app.use(cors());

app.get("/list", (req, res) => {
  const newlist = new Lists({
    name: "roli",
    age: 38,
  });
  newlist
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/lists", (req, res) => {
  Lists.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/home", (req, res) => {
  res.json({ message: "hello world roli", people: ["ali", "roli", "ebi"] });
});

app.get("/delall", (req, res) => {
  Lists.deleteMany().then((result) => res.send(result));
});

app.delete("/delone/:id", (req, res) => {
  Lists.findByIdAndDelete(req.params.id).then((result) => res.send(result));
});

app.post("/add", (req, res) => {
  const add = new Lists({
    name: req.body.name,
    age: req.body.age,
  });
  add.save().then((result) => res.send(add));
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
