<script>
	import Spinner from './../misc/Spinner.svelte';
	import SearchBar from './../input/SearchBar.svelte';
	import InputField from './../input/InputField.svelte';
	import Tooltip from './../misc/Tooltip.svelte';
	import sortBy from './../../script/sortBy.js';
	export let columns;
	export let tooltips = [];
	export let rows;
	export let click;
	export let search = "";
	export let liveSearch = false;
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
		if(search === "") return true;
		let result = false;
		for(let j = 0; j < row.length; j++){
			let col = row[j];
			if(	selectedTags.includes(	toTag(	columns[j]	)	)	){
				let regex = new RegExp(search.replace(/\W/i,"."),"i");
				if(col.match(regex)){
					result = true;
					break;
				}
			}
		}
		return result;
	}
	function done(){
		loading = false;
	}
	function registerFooterEvents(th,i){
		th.addEventListener("click",e=>{
			header[i].click();
		});
	}

	let reverseSort = true;
	let lastSortedColIndex = -1;
	function sortRows(colIndex){
		if(!rows) return;
		if(colIndex !== lastSortedColIndex){
			lastSortedColIndex = -1;
			reverseSort = true;
		}

		rows.sort(sortBy(colIndex,reverseSort));
		if(colIndex === lastSortedColIndex || lastSortedColIndex === -1)
			reverseSort = !reverseSort;
		lastSortedColIndex = colIndex;
		rows = rows;
	}

	function submit(search,tags){
		rows = rows;
	}
</script>
{#if loading}
<Spinner />
{:else}
<SearchBar {liveSearch} onTagsUpdate={tags=>selectedTags = tags} text="Cerca" {submit} {suggestions} bind:tags={tags} {label} bind:value={search}/>
<br />
<br />
{/if}
<table class="table table-bordered {cls}">
	<thead>
		<tr>
			{#each columns as col,i}
			<th on:click={()=>{sortRows(i)}} class="{selectedTags.includes(toTag(col))?'selected':''}" bind:this={header[i]}>
				{#if tooltips && tooltips[i]}
					<small><Tooltip target={header[i]}>{tooltips[i]}</Tooltip></small>
				{/if}
				<span use:mapColumnAsTag={{col:col,i:i}}>
					{col}
					{#if i === lastSortedColIndex}
						{#if reverseSort}
							<i class="fa fa-long-arrow-alt-up"></i>
						{:else}
							<i class="fa fa-long-arrow-alt-down"></i>
						{/if}
					{/if}
				</span>
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
				<span>
					{col}
					{#if i === lastSortedColIndex}
						{#if reverseSort}
							<i class="fa fa-long-arrow-alt-up"></i>
						{:else}
							<i class="fa fa-long-arrow-alt-down"></i>
						{/if}
					{/if}
				</span>
			</th>
			{/each}
		</tr>
	</tbody>
</table>

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
		background: #ffffff;
	}
	td{
		user-select: text;
	}
</style>