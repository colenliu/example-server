const express = require("express");
const app = express();
const port = 3000;

/**
 * Greeting when name specified.
 */
app.get(`/greetings/:name`, (req, res) => {
  try {
    const name = req.params.name;

    if (!name.match(/^[a-z0-9]+$/i)) {
      return res.status(400).json({
        statusCode: 400,
        error: "Please try again with an alphanumeric name.",
      });
    }

    return res.send(`Hello, ${name}!`);
  } catch (err) {
    return res.sendStatus(404);
  }
});

/**
 * Greeting when no name specified.
 */
app.get(`/greetings`, (req, res) => {
  try {
    return res.send(`Hello, Stranger!`);
  } catch (err) {
    return res.sendStatus(404);
  }
});

// Handles non-accepted characters in the URL.
app.use((err, req, res, next) => {
  try {
    if (!err) return next();

    return res.status(400).json({
      statusCode: 400,
      error: "Please try again with an alphanumeric name.",
    });
  } catch (err) {
    return res.sendStatus(404);
  }
});

/**
 * Handles incorrectly formatted URLs.
 */
app.use(function (req, res, next) {
  try {
    res.status(400);

    // respond with json
    if (req.accepts("json")) {
      res.json({
        statusCode: 400,
        error: "Please check that the URL is formed corrctly.",
      });
      return;
    }
  } catch (err) {
    return res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
