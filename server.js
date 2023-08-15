const http = require("node:http");

const { handle } = require("./src/handler");

const log = (request) => {
  console.log(request.method, request.url);
};

const main = () => {
  const server = http.createServer((request, response) => {
    log(request);
    handle(request, response);
  });

  const PORT = 8080;
  server.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
  });
};

main();
