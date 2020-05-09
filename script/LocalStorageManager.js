import uuid from './uuid.js';

export default function LocalStorageManager() {};

LocalStorageManager.checked = false;
LocalStorageManager.check=()=>{
	let test = uuid();
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		LocalStorageManager.checked = true;
		return true;
	} catch(e) {
		console.warn("This browser does not support the localStorage API.");
		return false;
	}
};