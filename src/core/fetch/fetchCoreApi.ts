import { buildCommonFetchConfig } from '@/core/fetch/client/fetchClient';

const fetchCoreApi = {
  async refreshToken() {
    const { baseUrl, ...config } = buildCommonFetchConfig();
    const endpoint = baseUrl + '/refresh';
    return window.fetch(endpoint, config);
  },
};

export { fetchCoreApi };
