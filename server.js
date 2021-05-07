const express = require("express");
const app = express();
const port = 3000;

app.get(`/greetings/:name`, (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
