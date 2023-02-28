type WebStorageStoredValue = null | string | Record<string, string | number> | (string | number)[];
const { localStorage, sessionStorage } = window;

const webStorage = {
  local: {
    setItem(itemName: string, itemValue: WebStorageStoredValue) {
      localStorage.setItem(itemName, JSON.stringify(itemValue));
    },
    getItem(itemName: string): WebStorageStoredValue {
      let storedValue = localStorage.getItem(itemName);

      storedValue = storedValue ? JSON.parse(storedValue) : null;

      return storedValue;
    },
    removeItem(itemName: string) {
      localStorage.removeItem(itemName);
    },
  },
  session: {
    setItem(itemName: string, itemValue: WebStorageStoredValue) {
      sessionStorage.setItem(itemName, JSON.stringify(itemValue));
    },
    getItem(itemName: string): WebStorageStoredValue {
      let storedValue = sessionStorage.getItem(itemName);

      storedValue = storedValue ? JSON.parse(storedValue) : null;

      return storedValue;
    },
    removeItem(itemName: string) {
      sessionStorage.removeItem(itemName);
    },
  },
  cookie: {
    getCookie(name: string, initialValue: string) {
      const nameQuery = `${name}=`;

      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(nameQuery))
        ?.split('=')[1];

      return cookieValue || initialValue;
    },
    setCookie(name: string, value: string, httpOnly = false) {
      const httpValue = httpOnly ? ' HttpOnly;' : '';
      document.cookie = `${name}=${value}; Secure;${httpValue}`;
    },
    deleteCookie(name: string) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`;
    },
  },
  getFromWebStorage(itemName: string): WebStorageStoredValue {
    let itemValue = webStorage.local.getItem(itemName);

    if (!itemValue) {
      itemValue = webStorage.session.getItem(itemName);
    }

    return itemValue;
  },
  removeFromWebStorage(itemName: string) {
    webStorage.session.removeItem(itemName);
    webStorage.local.removeItem(itemName);
  },
};

export default webStorage;
