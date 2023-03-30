const UppercaseTransform = require("./UppercaseTransform");
const http = require("http");

const port = process.argv[2];
const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    return res.end();
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  const uppercaseTransform = new UppercaseTransform();
  req.pipe(uppercaseTransform).pipe(res);
});

server.listen(port);
