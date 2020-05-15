import { writable } from 'svelte/store';

let store = window.location.pathname;


const pathname = writable(store);

export {pathname};