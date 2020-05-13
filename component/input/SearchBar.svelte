<script>
	import { language } from './../../store/language.js';
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
	export let suggestions = [];
	export let tags = {};
	let y = -1;
	let cls = ""; export {cls as class};
	let buttonClass = "btn-primary";
	let self,id = uuid();
	let focused = false;
	let activeSuggestionList = [];
	let shiftDown = false;
	let showAll = false;
	const PATTERN_TAG = /\#\w+\s+/g;
	let selectedTags = [];

	function select(item){
		if(item.action){
			item.action(item,selectedTags);
		}
		value = item.value;
	}

	function highlightUp(){
		if(y-1 < 0){
			y = activeSuggestionList.length-1;
		}else
			y--;
	}

	function highlightDown(){
		if(y < 0){
			y = 0;
		}else
			y = (y + 1)%activeSuggestionList.length;
	}

	function keydown(e){
		switch(e.keyCode){
			case 13: //enter
				if(y >= 0 && activeSuggestionList[y] && activeSuggestionList[y].action)
					select(activeSuggestionList[y]);
				else
					submit(value,selectedTags);
				break;
			case 38: //arrow up
				highlightUp();
			break;
			case 40: //arrow down
				highlightDown();
			break;
		}
	}
	function keyup(e){
		switch(e.keyCode){
			case 38: //arrow up
				//highlightUp();
			break;
			case 40: //arrow down
				//highlightDown();
			break;
			default:
				filter(e.keyCode === 8 && e.shiftKey);
				break;
		}
	}

	function filter(pop){
		y = -1;
		let inputMatches = value.match(PATTERN_TAG);
		if(inputMatches){
			for(let inputMatch of inputMatches){
				inputMatch = inputMatch.trim().toLocaleLowerCase();
				for(let key in tags){
					key = key.toLocaleLowerCase();
					if(inputMatch === key && !selectedTags.includes(key)){
						selectedTags.push(key);
						value = "";
						selectedTags = selectedTags;
						return;
					}
				}
			}
		}

		activeSuggestionList = [];
		if(value.trim() === "") {
			if(pop){
				selectedTags.pop();
				selectedTags = selectedTags;
			}
			return;
		}
		const regex = new RegExp(value===""?".*":value);
		let tmp = null;
		for(let i = 0; i < suggestions.length; i++){
			let suggestion = suggestions[i];
			try{
				tmp = suggestion.value.toLocaleLowerCase();
				if(tmp.match(regex) && tmp !== value.toLocaleLowerCase() && !activeSuggestionList.includes(suggestion)){
					activeSuggestionList.push(suggestion);
				}
			}catch(e){
				console.error(e);
			}
		}
		tmp = null;
		Object.keys(tags).forEach(key=>{
			key = key.toLocaleLowerCase();
			if(selectedTags.includes(key)){
				for(let i = 0; i < tags[key].length; i++){
					try{
						tmp = tags[key][i].value.toLocaleLowerCase();
						if(tmp.match(regex) && tmp !== value.toLocaleLowerCase() && !activeSuggestionList.includes(tags[key][i])){
							activeSuggestionList.push(tags[key][i]);
						}
					}catch(e){
						console.error(e);
					}
				}
			}
		});

		Object.keys(tags).forEach(key=>{
			key = key.toLocaleLowerCase()+" ";
			if(key !== "main" && key.match(regex)){
				const o = {value:key,action:()=>{
					setTimeout(()=>{
						filter(false);
					},100);
				}};
				activeSuggestionList.push(o);
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
					let index2 = activeSuggestionList.indexOf(suggestion);
					if(index2 >= 0)
						activeSuggestionList.splice(index2,1);
				});
			}
			
		});
		selectedTags = selectedTags;
		activeSuggestionList = activeSuggestionList;
	}
</script>
<div class="search-bar {cls}">
	<div class="form-label-group">
		{#if hints && focused && value === "" && selectedTags.length > 0}
			<div transition:fly={{ y: 30, duration: 200 }} class="remove-tag-info">
				<b>Shift</b> + <i class="fa fa-backspace"></i> {$language.toPopATag}.
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

		<input on:keydown={keydown} on:keyup={keyup} on:focus={()=>{focused = true}} on:blur={()=>{focused = false}} bind:this={self} bind:value={value} id="{id}-search-bar" class="form-control" placeholder={label}>
		<label for="{id}-search-bar">{label}</label>
	</div>
	<button type="button" on:click={()=>{submit(value,selectedTags)}} class="submit btn {buttonClass}">
		<i class="fa fa-{icon}"></i>
		<span>{text}</span>
	</button>
	
	{#if focused && activeSuggestionList.length > 0}
	<div transition:fly={{ y: -30, duration: 200 }} class="activeSuggestionList card">
		<ul class="list-group list-group-flush">
			{#each activeSuggestionList as item,i}
			<li class="list-group-item{y === i?" selected":""}" on:click={()=>{select(item)}}>
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
	.selected{
		background: rgba(200,200,200,0.3);
	}
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

	.activeSuggestionList{
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.2rem;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 30vh;
	}
	.activeSuggestionList .list-group-item{
		cursor: pointer;
	}
	.activeSuggestionList .list-group-item:hover,.activeSuggestionList .list-group-item.hovering{
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