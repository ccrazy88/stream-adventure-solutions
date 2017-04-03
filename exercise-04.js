const UppercaseTransform = require("./UppercaseTransform");

const uppercaseTransform = new UppercaseTransform();
process.stdin.pipe(uppercaseTransform).pipe(process.stdout);
