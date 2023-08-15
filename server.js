const fs = require("fs");
const http = require("node:http");

const log = (request) => {
  console.log(request.method, request.url);
};

const DO_SOMETHING = () => {};

const serveHomePage = (_, response) => {
  const filePath = "resources/pages/index.html";
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.statusCode = 400;
      response.end("SOME ERROR OCCURED");
    }
    response.writeHead(200, { "content-type": "text/html" });
    response.end(content);
  });
};

const handle = (request, response) => {
  const routes = [
    { route: "^/$", method: "GET", handler: serveHomePage },
    { route: "^/find", method: "POST", handler: DO_SOMETHING },
  ];

  const { handler } = routes.find(({ route, method }) => {
    const regExp = new RegExp(route);
    return regExp.test(request.url) && method === request.method;
  });

  handler(request, response);
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
