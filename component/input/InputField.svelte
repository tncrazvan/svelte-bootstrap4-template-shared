<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	export let value="";
	export let label="";
	export let type="text";
	let cls = ""; export {cls as class};
	let self,id = uuid();
	onMount(()=>{
		self.setAttribute("type",type);
	});
</script>
<div class="form-label-group {cls}">
	<input bind:this={self} bind:value={value} id="{id}-inputPassword" class="form-control" placeholder={label}>
	<label for="{id}-inputPassword">{label}</label>
</div>