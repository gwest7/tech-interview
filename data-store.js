import { fetchData } from './slow-source.js';

export function createStore(fetch = fetchData, refreshMs = 5000) {
  let cache;
  let refreshing;

  function refresh() {
    cache = undefined;
    refreshing = fetch().then(
      (data) => { cache = data; },
      (err) => { cache = { error: err.message }; },
    );
  }

  return {
    start() {
      refreshing = fetch().then((data) => { cache = data; });
      setInterval(refresh, refreshMs).unref();
    },
    async get() {
      await refreshing;
      return cache;
    },
  };
}
