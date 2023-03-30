const Transform = require("stream").Transform;

class LineTransform extends Transform {
  constructor(options) {
    super(options);
    this.currentChunk = null;
    this.addCharToCurrentChunk = this.addCharToCurrentChunk.bind(this);
    this.pushCurrentChunkIfNeeded = this.pushCurrentChunkIfNeeded.bind(this);
    this._transform = this._transform.bind(this);
  }

  addCharToCurrentChunk(char) {
    if (this.currentChunk) {
      this.currentChunk += char;
    } else {
      this.currentChunk = char;
    }
  }

  pushCurrentChunkIfNeeded() {
    if (this.currentChunk) {
      this.push(this.currentChunk);
      this.currentChunk = null;
    }
  }

  _transform(chunk, encoding, callback) {
    for (const char of chunk.toString()) {
      this.addCharToCurrentChunk(char);
      if (char === "\n") {
        this.pushCurrentChunkIfNeeded();
      }
    }
    callback();
  }
}

class AlternateCaseTransform extends Transform {
  constructor(options) {
    super(options);
    this.lowercase = true;
    this._transform = this._transform.bind(this);
  }

  processChunk(chunk) {
    const stringChunk = chunk.toString();
    const casedChunk = this.lowercase
      ? stringChunk.toLowerCase()
      : stringChunk.toUpperCase();
    this.lowercase = !this.lowercase;
    return casedChunk;
  }

  _transform(chunk, encoding, callback) {
    const casedChunk = this.processChunk(chunk);
    callback(null, casedChunk);
  }
}

const lineTransform = new LineTransform();
const alternateCaseTransform = new AlternateCaseTransform();
process.stdin
  .pipe(lineTransform)
  .pipe(alternateCaseTransform)
  .pipe(process.stdout);
