const fs = require("fs");

const path = process.argv[2];
fs.createReadStream(path).pipe(process.stdout);
