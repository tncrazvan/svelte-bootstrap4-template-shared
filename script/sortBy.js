export default function sortBy(key,reverse){
	// Move smaller items towards the front
	// or back of the array depending on if
	// we want to sort the array in reverse
	// order or not.
	const moveSmaller = reverse ? 1 : -1;
 
	// Move larger items towards the front
	// or back of the array depending on if
	// we want to sort the array in reverse
	// order or not.
	const moveLarger = reverse ? -1 : 1;
	
	return (a, b) => {
		 if(a === null || b === null) return 0;
		 if (a[key] < b[key]) {
			  return moveSmaller;
		 }
		 if (a[key] > b[key]) {
			  return moveLarger;
		 }
		 return 0;
	};
}