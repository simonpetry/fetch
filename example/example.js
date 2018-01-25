import 'promise-polyfill/src/polyfill'; // for IE
// import fetch from '../src/fetch'; // locally
// or
import '../dist/polyfill'; // globally, also good for IE

const user = fetch('https://jsonplaceholder.typicode.com/comments?postId=1',
  { 
    method: 'POST',
    body: JSON.stringify({ comment: 'Hey' }),
    headers: {
      'X-TEST': 'test'
    }
  }
)
.then(response => {
  console.log(response.headers.forEach((value, key) => console.log(`header: ${key}: ${value}`)));
  console.log('headers', response.headers.entries());
  console.log('headers', response.headers.values());
  console.log('headers', response.headers.keys());
  console.log('headers', response.headers.has('location'));
  console.log('headers', response.headers.get('location'));

  return response.json();
})
.then(response => console.log('success', response))
.catch(response => console.log('catch', response));
