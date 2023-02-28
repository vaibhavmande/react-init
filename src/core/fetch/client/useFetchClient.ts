import { useMemo } from 'react';
import fetchAuthClient from '@/core/fetch/client/fetchAuthClient';
import webStorage from '@/core/web-storage/webStorage';

function useFetchClient() {
  const apiKey = webStorage.cookie.getCookie('api-key', 'initial-key');

  return useMemo(() => {
    return fetchAuthClient(apiKey);
  }, [apiKey]);
}

export default useFetchClient;
