import { writable } from 'svelte/store';
import lsm from '../script/LocalStorageManager.js';

let store = null;
if(lsm.check() && localStorage["session"]){
	try{
		store = JSON.parse(localStorage["session"]);
		console.info("User Session store loaded from local storage.");
	}catch(e){
		console.info("Could not load user session: ",localStorage["session"],e);
		store = null;
	}
}

const session = writable(store);

export {session};