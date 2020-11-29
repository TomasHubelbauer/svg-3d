import parse from 'https://tomashubelbauer.github.io/esm-obj/index.js';

export default async function model(/** @type {string} */ url) {
  return parse(await fetch(url).then(response => response.text()));
}
