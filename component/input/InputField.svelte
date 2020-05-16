<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	export let value="";
	export let label="";
	export let type="text";
	let css; export{css as style};
	let cls = ""; export {cls as class};
	let self,id = uuid();
	onMount(()=>{
		if(type !== "textarea")
			self.setAttribute("type",type);
	});
</script>
<div style={css} class="form-label-group {cls}">
	{#if type !== "textarea"}
	<input bind:this={self} bind:value={value} id={id} class="form-control" placeholder={label}>
	<label for={id}>{label}</label>
	{:else}
	<span class="textarea-label">{label}</span>
	<textarea bind:this={self} id={id} class="form-control">{value}</textarea>
	{/if}
</div>
<style>
	.textarea-label{
		margin: 0.5rem;
	}
</style>