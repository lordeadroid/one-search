const fs = require("fs");

let POST_REQUEST = {};

const getRequestParams = (requestBody) => {
  return Object.fromEntries(new URLSearchParams(requestBody));
};

const handleSearchPage = (request, response) => {
  let requestBody = "";

  request.on("data", (data) => {
    requestBody += data;
  });

  request.on("end", () => {
    POST_REQUEST = getRequestParams(requestBody);

    response.writeHead(303, { location: "/search-links" });
    response.end();
  });
};

const createGoogleLink = (searchRequest) => {
  return `<li><a href="https://www.google.com/search?q=${searchRequest}">GOOGLE</a></li>`;
};

const createWikipediaLink = (searchRequest) => {
  return `<li><a href="https://www.wikipedia.com/wiki/${searchRequest}">WIKIPEDIA</a></li>`;
};

const createLinks = (searchRequest) => {
  const googleLink = createGoogleLink(searchRequest);
  const wikipediaLink = createWikipediaLink(searchRequest);
  return `${googleLink}\n${wikipediaLink}`;
};

const serveSearchLinks = (_, response) => {
  const filePath = "resources/pages/search-links.html";

  fs.readFile(filePath, "utf-8", (error, content) => {
    if (error) {
      response.statusCode = 400;
      response.end("SOME ERROR OCCURED");
      return;
    }

    const links = createLinks(POST_REQUEST.search);

    const htmlPage = content.replace("%links%", links);
    response.writeHead(200, { "content-type": "text/html" });
    response.end(htmlPage);
  });
};

const serveHomePage = (_, response) => {
  const filePath = "resources/pages/index.html";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.statusCode = 400;
      response.end("SOME ERROR OCCURED");
      return;
    }

    response.writeHead(200, { "content-type": "text/html" });
    response.end(content);
  });
};

const handlePageNotFound = (_, response) => {
  response.statusCode = 404;
  response.end();
};

const handle = (request, response) => {
  const routes = [
    { route: "^/$", method: "GET", handler: serveHomePage },
    { route: "^/find", method: "POST", handler: handleSearchPage },
    { route: "^/search-links", method: "GET", handler: serveSearchLinks },
  ];

  const { handler } = routes.find(({ route, method }) => {
    const regExp = new RegExp(route);
    return regExp.test(request.url) && method === request.method;
  }) || { handler: handlePageNotFound };

  handler(request, response);
};

module.exports = { handle };
