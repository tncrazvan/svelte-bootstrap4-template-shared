<script>
	import IconButton from './../button/IconButton.svelte';
	import InputField from './InputField.svelte';
	import { fly } from 'svelte/transition';
	import uuid from './../../script/uuid.js';
	export let value="";
	export let label="Search";
	export let text="";
	export let icon="search";
	export let submit;
	export let hints = true;
	let buttonClass = "btn-primary";
	let self,id = uuid();
	let focused = false;
	let suggestionsList = [];
	let tags = {
		"main":[
			{"value":"asq234e2d"},
			{"value":"3qwr54"},
			{"value":"ho3qw4rw"},
			{"value":"3qw4"},
			{"value":"aaaaaa?"},
		],
		"#prt": [
			{"value":"hello"},
			{"value":"world"},
			{"value":"how"},
			{"value":"are"},
			{"value":"you?"},
		],
		"#asd1": [],
		"#asd2": [],
		"#asd3": [],
		"#asd4": [],
		"#asd5": [],
		"#asd6": [],
	};
	let shiftDown = false;
	let showAll = false;
	const PATTERN_TAG = /\#\w+\s+/g;
	let selectedTags = [];
	function select(item){
		value = item.value;
	}
	function keyup(e){
		filter(e.keyCode === 8 && e.shiftKey);
	}
	function filter(pop){
		let groups = value.match(PATTERN_TAG);
		if(groups){
			groups.forEach(group=>{
				group = group.trim();
				Object.keys(tags).forEach(key=>{
					if(group.match(key) && !selectedTags.includes(key)){
						selectedTags.push(key);
						value = "";
						selectedTags = selectedTags;
						return;
					}
				});
			});
		}

		suggestionsList = [];
		if(value.trim() === "") {
			if(pop){
				selectedTags.pop();
				selectedTags = selectedTags;
			}
			return;
		}
		const regex = new RegExp(value===""?".*":value);
		Object.keys(tags).forEach(key=>{
			if(selectedTags.includes(key) || key === "main"){
				tags[key].forEach(item=>{
					if(item.value.match(regex) && item.value !== value)
						suggestionsList.push(item);
				});
			}
		});
		
		
	}

	function removeTag(tag){
		let toRemove = [];
		Object.keys(tags).forEach((key,i)=>{
			if(key === tag){
				toRemove.push(key);
			}
		});
		toRemove.forEach(key=>{
			let index1 = selectedTags.indexOf(key);
			if(index1 >= 0){
				let suggestionsToRemove = selectedTags.splice(index1,1);
				suggestionsToRemove = tags[suggestionsToRemove];
				suggestionsToRemove.forEach(suggestion=>{
					let index2 = suggestionsList.indexOf(suggestion);
					if(index2 >= 0)
						suggestionsList.splice(index2,1);
				});
			}
			
		});
		selectedTags = selectedTags;
		suggestionsList = suggestionsList;
	}
</script>
<div class="search-bar">
	<div class="form-label-group">
		{#if hints && focused && value === "" && selectedTags.length > 0}
			<div transition:fly={{ y: 30, duration: 200 }} class="remove-tag-info">
				<b>Shift</b> + <i class="fa fa-backspace"></i> to pop a tag.
			</div>
		{/if}

		{#if selectedTags.length > 0}
		<div transition:fly={{ y: -30, duration: 200 }} class="tags">
			{#each selectedTags as tag}
			<div transition:fly={{ y: -30, duration: 200 }} class="tag btn btn-sm btn-primary">
				{tag}
				<i  on:click={()=>{removeTag(tag)}} class="fa fa-times"></i>
			</div>
			{/each}
		</div>
		{/if}

		<input on:keyup={keyup} on:focus={()=>{focused = true}} on:blur={()=>{focused = false}} bind:this={self} bind:value={value} id="{id}-search-bar" class="form-control" placeholder={label}>
		<label for="{id}-search-bar">{label}</label>
	</div>
	<button type="button" on:click={()=>{submit(value)}} class="submit btn {buttonClass}">
		<i class="fa fa-{icon}"></i>
		<span>{text}</span>
	</button>
	
	{#if focused && suggestionsList.length > 0}
	<div transition:fly={{ y: -30, duration: 200 }} class="suggestionsList card">
		<ul class="list-group list-group-flush">
			{#each suggestionsList as item}
			<li class="list-group-item" on:click={()=>{select(item)}}>
				{#if item.icon}
					<i class="fa fa-{item.icon}"></i>
				{/if}
				<span>{item.value}</span>
			</li>
			{/each}
		</ul>
	</div>
	{/if}
</div>


<style>
	.remove-tag-info{
		position: absolute;
		top: -2rem;
		padding: 0.3rem;
		left: 2rem;
		text-align: center;
		right: 0;
		pointer-events: none;
		background: rgba(200,200,200,0.3);
		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
	}
	.tags{
		position: absolute;
		top: 100%;
		left: 2rem;
		right: 0;
		border-bottom-left-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
		padding: 0.3rem;
		background: rgba(200,200,200,0.3);
	}
	.tags .tag:not(:last-child){
		margin-right: 2px;
	}
	.tags .tag{
		cursor: default;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
	}
	.tags .tag i{
		cursor: pointer;
	}

	.suggestionsList{
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.2rem;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 30vh;
	}
	.suggestionsList .list-group-item{
		cursor: pointer;
	}
	.suggestionsList .list-group-item:hover,.suggestionsList .list-group-item.hovering{
		background: rgba(200,200,200,0.3);
	}

	.form-label-group{
		margin: 0;
	}
	.form-label-group input{
		position: relative;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		z-index: 0;
	}
	.submit.btn{
		position: relative;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		padding-top: 0;
		padding-bottom: 0;
		z-index: 1;
	}
	.search-bar{
		position: relative;	
		display: grid;
		grid-template-columns: 1fr auto;
	}
</style>