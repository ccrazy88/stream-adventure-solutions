const Transform = require("stream").Transform;

class UppercaseTransform extends Transform {
  constructor(options) {
    super(options);
    this._transform = this._transform.bind(this);
  }

  _transform(chunk, encoding, callback) {
    const uppercaseChunk = chunk.toString().toUpperCase();
    callback(null, uppercaseChunk);
  }
}

const uppercaseTransform = new UppercaseTransform();
process.stdin.pipe(uppercaseTransform).pipe(process.stdout);
