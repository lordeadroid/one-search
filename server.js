const http = require("node:http");

const log = (request) => {
  console.log(request.method, request.url);
};

const handle = (request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Welcome</h1>");
    return;
  }

  response.statusCode = 404;
  response.end("<h1>NOT FOUND</h1>");
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
