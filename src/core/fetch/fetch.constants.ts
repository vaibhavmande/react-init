const COMMON_HEADERS: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=UTF-8',
};

const COMMON_CONFIG: RequestInit = {
  credentials: 'include',
};

export { COMMON_CONFIG, COMMON_HEADERS };
