const http = require("node:http");

const log = (request) => {
  console.log(request.method, request.url);
};

const handle = (request, response) => {
  response.writeHead(200, { "content-type": "text/html" });
  response.end("<h1>Welcome</h1>");
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
