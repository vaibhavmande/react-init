import { ClientFunctionShape } from '@/core/fetch/client/fetchClient';

const homePageApi = {
  getRecords<T>() {
    return (client: ClientFunctionShape) => client('/todos/1', true).get<T>();
  },
  checkKey<T>() {
    return (client: ClientFunctionShape) => client('/check-key').get<T>();
  },
  sendPayload(payload: string[]) {
    return () => (client: ClientFunctionShape) => client('/posts').post<string>(payload);
  },
};

export { homePageApi };
