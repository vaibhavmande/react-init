import splitStreamAtCharacter from '@/file-reader/splitStreamAtCharacter';
import batchChunk from '@/file-reader/batchChunk';

// change to event based, 'onProgress', 'onRead', 'onNewLine'
interface FileReaderOptions {
  breakAt?: string;
  batchSize?: number;
}

export class FileChunkReader {
  private file;
  private charToBreakLines;
  private rowBatchSize;
  private events = [];

  constructor(file: File, options: FileReaderOptions) {
    this.file = file;
    this.charToBreakLines = options.breakAt ?? '\n';
    this.rowBatchSize = options.batchSize ?? 5;
  }

  async streamReader<T>(
    reader: ReadableStreamDefaultReader<T>,
    cb: (value: T | undefined, done: boolean) => void
  ) {
    while (true) {
      const { value, done } = await reader.read();
      cb(value, done);
      if (done) {
        cb(value, true);
        return;
      }
    }
  }

  public async calculateProgress(reader: ReadableStreamDefaultReader<Uint8Array>) {
    let bytesRead = 0;
    let progress = 0;

    await this.streamReader<Uint8Array>(reader, (value, done) => {
      if (value && !done) {
        bytesRead += value.byteLength;
        progress = (bytesRead / this.file.size) * 100;

        console.log('progress = ', progress);
      }
    });
  }

  public startStream() {
    const [progressStream, mainStream] = this.file.stream().tee();

    this.calculateProgress(progressStream.getReader());

    return mainStream
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(splitStreamAtCharacter(this.charToBreakLines))
      .pipeThrough(batchChunk(this.rowBatchSize))
      .getReader();
  }
}

export default FileChunkReader;
