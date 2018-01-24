function fetch(url, options = {}) {
  // Response body types
  const __BLOB__ = 'blob';
  const __JSON__ = 'json';
  const __TEXT__ = 'text';

  function setHeaders(request, headers) {
    for (let header in headers) {
      request.setRequestHeader(header, headers[header]);
    }
  }

  function getHeaders(responseHeaders) {
    const headers = {};
    const entries = [];
    const keys = [];
    const values = [];

    // Collect the headers
    responseHeaders.replace(/^(.*?):\s?(.*)$/gm, ((match, key, value) => {
      headers[key] = value;

      entries.push([key, value]);
      keys.push(key);
      values.push(value);
    }));

    // Emulate the header methods
    return {
      get: header => headers[header.toLowerCase()],
      entries: () => entries,
      keys: () => keys,
      values: () => values,
      has: header => header.toLowerCase() in headers,
      forEach: callback => entries.forEach(entry => callback(entry[1], entry[0]))
    };
  }

  // Emulate and handle response type side-effect
  function handleTypes(request, response) {
    const bodyTypes ={
      [__TEXT__]: () => Promise.resolve(request.responseText),
      [__JSON__]: () => Promise.resolve(request.responseText).then(JSON.parse),
      [__BLOB__]: () => Promise.resolve(new Blob([request.response])),
    };
    
    // Handle setting bodyUsed on the response
    [__BLOB__, __JSON__, __TEXT__].forEach(type => {
      Object.defineProperty(response, type, {
        get: () => {
          if (response.bodyUsed) {
            throw new TypeError('TypeError: Already read');
          }

          response.bodyUsed = true;
          return bodyTypes[type];
        }
      });
    });

    return response;
  }

  function handleResponse(request) {
    const response = {
      url: request.responseURL,
      headers: request && getHeaders(request.getAllResponseHeaders()),
      bodyUsed: false,
      ok: status >= 200 && status <= 299,
      status: request.status,
      statusText: request.statusText,
      clone: () => handleResponse(request)
    };

    return handleTypes(request, response);
  }

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = () => resolve(handleResponse(request));

    // Params: method, url, async
    request.open(options.method || 'GET', url, true);

    // Handle call failing
    request.onerror = reject;
    request.ontimeout = reject;

    // Update request
    if (options.headers) setHeaders(request, options.headers);
    if (options.credentials) request.withCredentials = true;

    request.send(options.body);
  });
};

export default 'fetch' in window
  ? window.fetch
  : fetch;