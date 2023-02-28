import { COMMON_CONFIG, COMMON_HEADERS } from '@/core/fetch/fetch.constants';
import webStorage from '@/core/web-storage/webStorage';
import { fetchCoreApi } from '@/core/fetch/fetchCoreApi';

interface ClientConfigShape extends RequestInit {
  url: string;
  baseUrl?: string;
  data?: unknown;
}

declare type ClientFunctionShape = typeof fetchClient;

function buildCommonFetchConfig(): Omit<ClientConfigShape, 'url'> {
  return {
    method: 'GET',
    baseUrl: SERVICE_URL,
    body: null,
    ...COMMON_CONFIG,
  };
}

function fetchClient(url: string, replace = false) {
  const headers = new Headers(COMMON_HEADERS);

  let core: ClientConfigShape = {
    url,
    ...buildCommonFetchConfig(),
  };

  function buildConfig(): RequestInit {
    const { url: _url, baseUrl: _baseUrl, body: _body, data, ...requestConfig } = core;

    return {
      body: data ? JSON.stringify(data) : undefined,
      headers,
      ...requestConfig,
    };
  }

  async function responseHandler<R>(response: Response) {
    let data: string | null = null;

    data = await response.text();

    const json = JSON.parse(data ? data : '{}');

    if (response.ok) {
      return json as R;
    } else {
      return Promise.reject(json.Detail ?? json);
    }
  }

  function fetch<R>() {
    const { baseUrl, url } = core;
    return window
      .fetch(replace ? url : `${baseUrl}${url}`, buildConfig())
      .then(async (response) => {
        const storage = webStorage.cookie;
        if (response.status == 401) {
          try {
            const refreshResponse = await fetchCoreApi.refreshToken();
            const { token: refreshToken } = await responseHandler<{ token: string }>(
              refreshResponse
            );

            storage.setCookie('api-key', refreshToken);
            headers.set('x-api-key', refreshToken);
          } catch (e) {
            storage.deleteCookie('api-key');
            // redirect to the login page
            return Promise.reject(e);
          }

          return window
            .fetch(replace ? url : `${baseUrl}${url}`, buildConfig())
            .then(responseHandler<R>);
        }

        return responseHandler<R>(response);
      });
  }

  return {
    get<R>() {
      core.method = 'GET';
      return fetch<R>();
    },
    post<R>(data: unknown = undefined) {
      core.method = 'POST';
      core.data = data;
      return fetch<R>();
    },
    url(url: string) {
      core.url = url;
      return this;
    },
    config(config: Partial<ClientConfigShape>) {
      core = { ...core, ...config };
      return this;
    },
    headers(cb: (a: Headers) => void) {
      cb(headers);
      return this;
    },
    getHeaders() {
      return headers;
    },
    getConfig() {
      return buildConfig();
    },
  };
}

export { fetchClient, buildCommonFetchConfig, ClientConfigShape, ClientFunctionShape };
