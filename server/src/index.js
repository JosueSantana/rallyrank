import app from './app.js';

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("Server is up on port " + port);
});