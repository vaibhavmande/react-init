import { fetchClient } from '@/core/fetch/client/fetchClient';
import { COMMON_CONFIG } from '@/core/fetch/fetch.constants';

const mockedFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('{ "resolves": true }'),
    json: () => Promise.resolve({ resolves: true }),
  })
);

global.fetch = mockedFetch as jest.Mock;

const fetchGetUrl = 'fetch-url-get';

afterAll(() => {
  mockedFetch.mockRestore();
});

describe('client', () => {
  test('truthy response.ok', () => {
    mockedFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('{ "resolves": true }'),
        json: () => Promise.resolve({ resolves: true }),
      })
    );
    const data = fetchClient(fetchGetUrl).get();
    expect(data).resolves.toStrictEqual({ resolves: true });
  });
  test('falsy response.ok', () => {
    mockedFetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('{ "resolves": false }'),
        json: () => Promise.resolve({ resolves: false }),
      })
    );
    const data = fetchClient(fetchGetUrl).get().catch();
    expect(data).rejects.toStrictEqual({ resolves: false });
  });
  test('calls fetch with default config', () => {
    const defaultConfig = {
      ...COMMON_CONFIG,
      method: 'GET',
      body: undefined,
    };

    const { headers: _headers, ...rest } = fetchClient(fetchGetUrl).getConfig();
    expect(rest).toEqual(defaultConfig);

    const { headers: __headers, ..._rest } = fetchClient(fetchGetUrl)
      .config({
        url: '',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        mode: 'no-cors',
        referrerPolicy: 'no-referrer',
      })
      .getConfig();

    expect(_rest).toEqual({
      ...defaultConfig,
      cache: 'no-cache',
      credentials: 'same-origin',
      mode: 'no-cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  });
  test('headers', () => {
    const headers = fetchClient(fetchGetUrl)
      .headers((header) => header.set('Content-Type', 'text/html; charset=utf-8'))
      .getHeaders();

    expect(headers.get('Content-Type')).toEqual('text/html; charset=utf-8');
    expect(headers.get('Accept')).toEqual('application/json');
  });
});
