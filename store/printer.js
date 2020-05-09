import { writable } from 'svelte/store';

let store = {
	title: "Printing",
	html: "",
	waiting: false,
	showing: false
};


const printer = writable(store);

export {printer};