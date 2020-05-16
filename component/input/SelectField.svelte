<script>
	import uuid from './../../script/uuid.js';
	export let options = [];
	export let value;
	let selected;
	let id = uuid();
	options.forEach(option=>{
		if(option.selected)
			selected = option;
	});

	function click(option){
		selected = option;
		value = selected.value;
	}
</script>

<div class="input-group">
	<div class="input-group-prepend">
		<label class="input-group-text" for={id}>Options</label>
	</div>
	<select class="custom-select" id={id}>
	{#each options as option}
		{#if option.selected}
			<option on:click={()=>{click(option)}} value={option.value}>{option.text}></option>
		{:else}
			<option on:click={()=>{click(option)}} value={option.value}>{option.text}</option>
		{/if}
	{/each}
	</select>
</div>