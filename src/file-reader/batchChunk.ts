function batchChunk(batchSize: number) {
  let buffer: string[] = [];

  return new TransformStream({
    transform(chunk: string, controller) {
      buffer.push(chunk);
      if (buffer.length == batchSize) {
        controller.enqueue(buffer);
        buffer = [];
      }
    },
    // if stream is read before we can enqueue, for eg if size: 5 and only 4 rows received in stream, flush will be called, and we should push everything to the next stream,
    // that's why two enqueue calls
    flush(controller) {
      if (buffer) {
        controller.enqueue(buffer);
      }
    },
  });
}

export default batchChunk;
