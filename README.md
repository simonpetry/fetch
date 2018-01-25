# Fetch

A small fetch polyfill made for the fun of it  
Wanted to dig a bit deeper into both XMLHttpRequest and fetch, why not both?

- Same API as `fetch`
- Similar response as `fetch`
- Emulates three of `fetch`'s stremable types `json`, `text`, `blob`
- Handles the body stream similarly, will throw an error if consumed twice and `bodyUsed` is handled
- Many of the response's header methods are emulated
- Clonable response
- 2kb before GZIP
- Comes with a polyfill
- Really need to publish this to npm...