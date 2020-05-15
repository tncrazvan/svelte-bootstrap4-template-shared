import { writable } from 'svelte/store';

let store = "";

const tooltip = writable(store);

export {tooltip};