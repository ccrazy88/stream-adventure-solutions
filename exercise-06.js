const Transform = require("stream").Transform;

class ConcatentationTransform extends Transform {
  constructor(options) {
    super(options);
    this.data = null;
    this.addChunk = this.addChunk.bind(this);
    this._flush = this._flush.bind(this);
    this._transform = this._transform.bind(this);
  }

  addChunk(chunk) {
    if (this.data) {
      this.data = Buffer.concat([this.data, chunk]);
    } else {
      this.data = chunk;
    }
  }

  _flush(callback) {
    if (this.data) {
      this.push(this.data);
    }
    callback();
  }

  _transform(chunk, encoding, callback) {
    this.addChunk(chunk);
    callback();
  }
}

class ReverseTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    // Note: This method of reversing a string is bad!
    const reversedChunk = chunk.toString().split("").reverse().join("");
    callback(null, reversedChunk);
  }
}

const concatentationTransform = new ConcatentationTransform();
const reverseTransform = new ReverseTransform();
process.stdin
  .pipe(concatentationTransform)
  .pipe(reverseTransform)
  .pipe(process.stdout);
