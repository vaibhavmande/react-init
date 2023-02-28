/**
 * This stream can be used at pipeThrough to transform a parent stream of characters.
 * the parent stream of strings will be split by splitOn.
 * You can use getReader on the returned TransformStream of this function
 * @param splitOn split a stream of string by a character e.g /n
 * @returns TransformStream
 */
function splitStreamAtCharacter(splitOn: string) {
  /**
   * initially buffer is a blank string.
   * at each chunk read, only transform part will get executed
   * so after all the lines are split, the last line is stored in buffer
   * this last line is appended to next chunk
   * this takes care of incomplete chunks. if a chunk is split before a line ends
   * then that gives rise to an incomplete line at the end,
   * this incomplete line is appended to the next chunk so that the line is now complete after append and
   * this fixes the problem of managing incomplete chunks
   */
  let buffer = '';

  return new TransformStream({
    transform(chunk: string, controller) {
      buffer += chunk;

      const parts = buffer.split(splitOn);
      parts.slice(0, -1).forEach((part) => {
        controller.enqueue(part);
      });

      buffer = parts[parts.length - 1];
    },
    flush(controller) {
      if (buffer) {
        controller.enqueue(buffer);
      }
    },
  });
}

export default splitStreamAtCharacter;
