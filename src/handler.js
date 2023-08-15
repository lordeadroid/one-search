const fs = require("fs");

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

module.exports = { handle };
