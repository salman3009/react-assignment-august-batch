const express = require("express");
const app = express();
const bodyParser = require("body-parser");




app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json("Hello World!");
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 == "string" || typeof num2 == "string") {
    return res.json({
      status: "error",
      message: "Invalid data types",
    });
  }

  const result = num1 + num2;
  if (num1 > 1000000 || num2 > 1000000 || result > 1000000) {
    return res.json({
      status: "error",
      message: "Overflow",
    });
  }
  return res.json({
    status: "success",
    message: "the sum of given two numbers",
    sum: result,
  });
});

app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  console.log(req.body);
  if (typeof num1 == "string" || typeof num2 == "string") {
    return res.json({
      status: "error",
      message: "Invalid data types",
    });
  }

  const sub = num1 - num2;
  if (sub < -1000000) {
    return res.json({
      status: "error",
      message: "Underflow",
    });
  }
  return res.json({
    status: "sub",
    message: "the difference of given two numbers",
    difference: sub,
  });
});

app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 == "string" && typeof num2 == "string") {
    return res.json({
      status: "error",
      message: "Invalid data types",
    });
  }

  const mult = num1 * num2;
  if (mult > 1000000) {
    return res.json({
      status: "error",
      message: "Overflow",
    });
  }
  return res.json({
    status: "success",
    message: "The product of given numbers",
    result: mult,
  });
});

app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 == "string" || typeof num2 == "string") {
    return res.json({
      status: "error",
      message: "Invalid data types",
    });
  }
  if (num2 === 0) {
    return res.json({
      status: "error",
      message: "Cannot divide by zero",
    });
  }
  const div = num1 / num2;
  if (div > 1000000) {
    return res.json({
      status: "error",
      message: "overflow",
    });
  }
  return res.json({
    status: "success",
    message: "The division of given numbers",
    result: div,
  });
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
