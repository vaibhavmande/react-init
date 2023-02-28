import { ClientFunctionShape } from '@/core/fetch/client/fetchClient';

const homePageApi = {
  getRecords<T>() {
    return (client: ClientFunctionShape) =>
      client('https://jsonplaceholder.typicode.com/todos/1', true).get<T>();
  },
  checkKey<T>() {
    return (client: ClientFunctionShape) => client('/check-key').get<T>();
  },
  sendPayload(payload: Record<string, unknown>) {
    return () => (client: ClientFunctionShape) =>
      client('/v1/employers/123/submit').config({ credentials: 'omit' }).post<string>(payload);
  },
};

export { homePageApi };
