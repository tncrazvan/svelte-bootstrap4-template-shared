<script>
	import {onMount} from 'svelte';
	import uuid from './../../script/uuid.js';
	export let color = "red";
	export let update;
	export let label;
	let val = ""; export {val as value};
	let self;
	let id = uuid();
	onMount(()=>{
		window.$(self).datepicker({
			weekStart: 1,
			color: color
		}).on('changeDate',ev=>{
			update(new Date(ev.date));
		});
	});
</script>
<div class="form-label-group">
	<input bind:this={self} bind:value={val} type="password" id="{id}-inputPassword" class="datepicker form-control" placeholder={label}>
	<label for="{id}-inputPassword">{label}</label>
</div>