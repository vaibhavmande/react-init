import { useState, useEffect, useCallback } from 'react';
import useFetchClient from '@/core/fetch/client/useFetchClient';
import { ClientFunctionShape } from '@/core/fetch/client/fetchClient';

const useAsync = <T, E = string>(
  asyncFunction: (...args: unknown[]) => (client: ClientFunctionShape) => Promise<T>,
  immediate = true
) => {
  const client = useFetchClient();

  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null | Error>(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    if (client) {
      return asyncFunction()(client)
        .then((json: T) => {
          setValue(json);
          setStatus('success');
        })
        .catch((error: E) => {
          setError(error);
          setStatus('error');
        });
    }
    return Promise.reject(error);
  }, [client, asyncFunction, error]);

  useEffect(() => {
    if (immediate) {
      execute().then((r) => r);
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

export default useAsync;
