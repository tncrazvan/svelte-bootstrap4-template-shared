<script>
	import Spinner from './../misc/Spinner.svelte';
	import SearchBar from './../input/SearchBar.svelte';
	import InputField from './../input/InputField.svelte';
	import Tooltip from './../misc/Tooltip.svelte';
	import SortTable from './SortTable.svelte';
	export let columns;
	export let tooltips = [];
	export let rows;
	export let click;
	export let search = "";
	export let label = "Utilizza i nomi delle colonne come #tag per eseguire una ricerca sulle colonne.";
	let cls; export {cls as class};
	let highlights = [];
	let header = [];
	let footer = [];
	let suggestions = [];
	let tags = {};
	let columnsToTagsMap = {};
	let loading = true;
	let selectedTags = [];
	const PATTERN_COLNAME_AS_TAG = /\W|\s/;

	function toTag(str){
		return "#"+str.replace(PATTERN_COLNAME_AS_TAG,"").replace(/\s+/,"").toLowerCase();;
	}

	function mapColumnAsTag(e,data){
		const tag = toTag(data.col);
		columnsToTagsMap[tag] = data.i;
	}

	function addToSuggestions(e,data){
		for(let key in columnsToTagsMap){
			if(columnsToTagsMap[key] === data.i){
				console.log(columnsToTagsMap[key]);
				if(!tags[key])
					tags[key] = [];
				
				let exists = false;
				tags[key].forEach(item=>{
					if(item.value === data.col)
						exists = true;
				});
				if(!exists)
					tags[key].push({value:data.col});
				break;
			}
		}
		tags = tags;
	}

	function filter(row,i){
		for(let col of row){
			
		}
		
		console.log(tags);
		return true;
	}
	function done(){
		loading = false;
	}
	function registerFooterEvents(th,i){
		th.addEventListener("click",e=>{
			header[i].click();
		});
	}
</script>
{#if loading}
<Spinner />
{:else}
<SearchBar onTagsUpdate={tags=>selectedTags = tags} text="Cerca" submit={e=>{}} {suggestions} bind:tags={tags} {label} bind:value={search}/>
<br />
<br />
{/if}
<SortTable class={cls}>
	<thead>
		<tr>
			{#each columns as col,i}
			<th class="{selectedTags.includes(toTag(col))?'selected':''}" bind:this={header[i]}>
				{#if tooltips && tooltips[i]}
					<small><Tooltip target={header[i]}>{tooltips[i]}</Tooltip></small>
				{/if}
				<span use:mapColumnAsTag={{col:col,i:i}}>{col}</span>
			</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row,j}
		{#if filter(row,j)}
		<tr on:click={()=>{click(row,j)}}>
			{#each row as col,i}
			<td use:addToSuggestions={{col:col,i:i}}>{col}</td>
			{/each}
		</tr>
		{/if}
		{/each}
	</tbody>
	<tbody use:done>
		<tr>
			{#each columns as col,i}
			<th use:registerFooterEvents={i} class="{selectedTags.includes(toTag(col))?'selected':''}" bind:this={footer[i]}>
				{#if tooltips && tooltips[i]}
					<small><Tooltip target={footer[i]}>{tooltips[i]}</Tooltip></small>
				{/if}
				<span>{col}</span>
			</th>
			{/each}
		</tr>
	</tbody>
</SortTable>

<style>
	.selected{
		color: #0069d9;
		text-decoration: underline;
	}
	th{
		cursor: pointer;
	}
	td,th{
		font-size: 0.8rem;
		user-select: text;
		background: #ffffff;
	}
</style>