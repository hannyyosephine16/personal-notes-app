export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function updateQueryParam(name, value) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  
  if (value === null || value === undefined || value === '') {
    params.delete(name);
  } else {
    params.set(name, value);
  }
  
  url.search = params.toString();
  window.history.replaceState({}, '', url.toString());
}

