import React, { useCallback, useId, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import FileChunkReader from '@/file-reader/FileChunkReader';
import useAsync from '@/hooks/useAsync';
import { homePageApi } from '@/home/api/homePageApi';

function FileSelector() {
  const inputId = useId();
  const [payload, setPayload] = useState<string[]>([]);

  const handlerError = useErrorHandler();

  const { status, execute, error } = useAsync<string>(homePageApi.sendPayload(payload), false);

  const errorMessage = error instanceof Error ? error.message : error;

  const fileUploadHandler = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const [file] = Array.from(event.currentTarget.files);

      if (file) {
        const chunkReader = new FileChunkReader(file, {});
        const reader = chunkReader.startStream();

        chunkReader
          .streamReader<string[]>(reader, (value, done) => {
            if (value && !done) {
              setPayload((payload) => [...payload, ...value]);
            }
          })
          .catch((error) => handlerError(error));
      }
    }
  }, []);

  return (
    <div className="file-container">
      <p>Select a file</p>
      <input id={inputId} type="file" accept="text/plain" onChange={fileUploadHandler} />
      {payload.length ? (
        <p role="alert" aria-describedby={inputId} aria-label="alert">
          {Number(payload.length)} rows read
        </p>
      ) : null}
      <button onClick={execute}>Send Payload</button>
      {status === 'error' ? (
        <p role="alert">{errorMessage ? errorMessage : 'Something went wrong.'}</p>
      ) : null}
      {status === 'success' ? <p>success</p> : null}
      {status === 'pending' ? <p>waiting for response</p> : null}
    </div>
  );
}

export default FileSelector;
