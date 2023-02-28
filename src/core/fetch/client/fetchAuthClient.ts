import { fetchClient } from '@/core/fetch/client/fetchClient';

function fetchAuthClient(apiKey: string) {
  return (url: string, replace = false) => {
    const client = fetchClient(url, replace);
    client.headers((header) => header.set('x-api-key', apiKey));
    return client;
  };
}

export default fetchAuthClient;
