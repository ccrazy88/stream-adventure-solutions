const { request } = require("http");

const options = { method: "POST" };
const post = request("http://localhost:8099", options, (response) => {
  response.pipe(process.stdout);
});
process.stdin.pipe(post);
