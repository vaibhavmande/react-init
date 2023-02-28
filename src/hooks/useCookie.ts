import { useState } from 'react';
import webStorage from '@/core/web-storage/webStorage';

function useCookie(
  key: string,
  initialValue: string
): [string, (key: string, value: string) => void] {
  const isBrowser = typeof window !== 'undefined';
  const storage = webStorage.cookie;

  function updateItem(key: string, value: string) {
    setItem(value);
    storage.setCookie(key, value);
  }

  const [item, setItem] = useState<string>(() => {
    return storage.getCookie(key, initialValue);
  });

  return isBrowser ? [item, updateItem] : [item, (key: string, value: string) => value];
}

export default useCookie;
