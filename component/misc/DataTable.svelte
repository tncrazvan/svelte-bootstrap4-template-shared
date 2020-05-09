<script>
	import { onMount } from 'svelte';
	export let columns;
	export let rows;
	let table;
	onMount(()=>{
		window.$(table).DataTable({
			dom:'Bfrtip',
			buttons:[
				{
					extend: 'pdfHtml5',
					orientation: 'landscape',
					pageSize: 'LEGAL'
				}
			]
		});
	});
</script>
<table bind:this={table} class="display" style="width:100%">
	<thead>
		<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row}
			<tr>
				{#each row as column}
					<td>{column}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			{#each columns as column}
				<th>{column}</th>
			{/each}
		</tr>
	</tfoot>
</table>