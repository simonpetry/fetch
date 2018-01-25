import fetch from './index';

if (!window.fetch) {
  window.fetch = fetch;
}